/**
 * Bill Payment Routes
 * Handles electricity, water, gas, broadband, and other bill payments
 */

import express from 'express';
import mysql from 'mysql2/promise';
import { protect as authMiddleware } from '../authMiddleware.js';

const router = express.Router();

// Database connection helper
async function getConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'recharge_db'
    });
}

/**
 * @route   GET /api/bills/providers/:type
 * @desc    Get bill providers by type
 * @access  Public
 */
router.get('/providers/:type', async (req, res) => {
    try {
        const { type } = req.params;

        const providers = {
            electricity: [
                { id: 'MSEDCL', name: 'Maharashtra State Electricity Distribution Co Ltd' },
                { id: 'BESCOM', name: 'Bangalore Electricity Supply Company' },
                { id: 'TSSPDCL', name: 'Telangana Southern Power Distribution' },
                { id: 'APSPDCL', name: 'Andhra Pradesh Southern Power Distribution' },
                { id: 'DGVCL', name: 'Dakshin Gujarat Vij Company Limited' }
            ],
            water: [
                { id: 'MCGM', name: 'Municipal Corporation of Greater Mumbai' },
                { id: 'BWSSB', name: 'Bangalore Water Supply and Sewerage Board' },
                { id: 'DJB', name: 'Delhi Jal Board' },
                { id: 'HMWSSB', name: 'Hyderabad Metropolitan Water Supply' }
            ],
            gas: [
                { id: 'IGL', name: 'Indraprastha Gas Limited' },
                { id: 'MGL', name: 'Mahanagar Gas Limited' },
                { id: 'GAIL', name: 'GAIL Gas Limited' },
                { id: 'ADANI', name: 'Adani Gas' }
            ],
            broadband: [
                { id: 'ACT', name: 'ACT Fibernet' },
                { id: 'AIRTEL', name: 'Airtel Broadband' },
                { id: 'JIO', name: 'Jio Fiber' },
                { id: 'BSNL', name: 'BSNL Broadband' },
                { id: 'HATHWAY', name: 'Hathway Broadband' }
            ]
        };

        res.json(providers[type.toLowerCase()] || []);
    } catch (error) {
        console.error('Get providers error:', error);
        res.status(500).json({ message: 'Failed to fetch providers' });
    }
});

/**
 * @route   POST /api/bills/pay
 * @desc    Pay a bill
 * @access  Private
 */
router.post('/pay', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const { bill_type, provider, consumer_number, amount, payment_mode } = req.body;
        const userId = req.user.id;

        // Validate inputs
        if (!bill_type || !provider || !consumer_number || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user is under a partner
        const [partnerCustomer] = await connection.query(
            'SELECT partner_id FROM partner_customers WHERE customer_id = ?',
            [userId]
        );

        const partnerId = partnerCustomer.length > 0 ? partnerCustomer[0].partner_id : null;

        // Create bill payment record
        const [result] = await connection.query(
            `INSERT INTO bill_payments 
       (user_id, partner_id, bill_type, provider, consumer_number, amount, total_amount, status, payment_mode)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)`,
            [userId, partnerId, bill_type, provider, consumer_number, amount, amount, payment_mode || 'RAZORPAY']
        );

        const billPaymentId = result.insertId;

        // Simulate bill payment processing
        // In production, this would integrate with actual bill payment API
        const paymentSuccess = true; // Simulated success

        if (paymentSuccess) {
            await connection.query(
                `UPDATE bill_payments SET status = 'SUCCESS', payment_id = ? WHERE id = ?`,
                [`BILL${Date.now()}`, billPaymentId]
            );

            // Calculate and credit commission
            await calculateBillCommission(connection, billPaymentId, userId, amount, bill_type.toLowerCase());

            res.json({
                success: true,
                message: 'Bill payment successful',
                billPaymentId,
                amount
            });
        } else {
            await connection.query(
                `UPDATE bill_payments SET status = 'FAILED' WHERE id = ?`,
                [billPaymentId]
            );

            res.status(400).json({
                success: false,
                message: 'Bill payment failed'
            });
        }

    } catch (error) {
        console.error('Bill payment error:', error);
        res.status(500).json({ message: 'Failed to process bill payment' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/bills/history
 * @desc    Get bill payment history
 * @access  Private
 */
router.get('/history', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { page = 1, limit = 20, type } = req.query;
        const offset = (page - 1) * limit;

        let query = `
      SELECT * FROM bill_payments
      WHERE user_id = ?
    `;
        const params = [userId];

        if (type) {
            query += ` AND bill_type = ?`;
            params.push(type.toUpperCase());
        }

        query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [bills] = await connection.query(query, params);

        const [countResult] = await connection.query(
            'SELECT COUNT(*) as total FROM bill_payments WHERE user_id = ?',
            [userId]
        );

        res.json({
            bills,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total
            }
        });

    } catch (error) {
        console.error('Get bill history error:', error);
        res.status(500).json({ message: 'Failed to fetch bill history' });
    } finally {
        await connection.end();
    }
});

/**
 * Helper function to calculate bill commission
 */
async function calculateBillCommission(connection, billPaymentId, userId, amount, billType) {
    try {
        // Check if user is under a partner
        const [partnerCustomer] = await connection.query(
            'SELECT partner_id FROM partner_customers WHERE customer_id = ?',
            [userId]
        );

        // Get commission settings
        const [settings] = await connection.query(
            'SELECT * FROM commission_settings WHERE service_type = ? AND service_category = ? AND is_active = TRUE',
            ['bill_payment', billType]
        );

        if (settings.length === 0) return;

        const commissionSetting = settings[0];

        // Create a transaction record for commission tracking
        const [transactionResult] = await connection.query(
            `INSERT INTO transactions 
       (user_id, mobile_number, operator, plan_amount, total_amount, status, recharge_status)
       VALUES (?, ?, ?, ?, ?, 'COMPLETED', 'SUCCESS')`,
            [userId, `BILL-${billPaymentId}`, billType, amount, amount]
        );

        const transactionId = transactionResult.insertId;

        if (partnerCustomer.length > 0) {
            // B2B - Partner commission
            const partnerId = partnerCustomer[0].partner_id;
            const partnerCommission = (amount * commissionSetting.b2b_partner_rate) / 100;

            await connection.query(
                `INSERT INTO commissions 
         (transaction_id, partner_id, commission_type, base_amount, commission_rate, commission_amount, status)
         VALUES (?, ?, 'B2B_PARTNER', ?, ?, ?, 'PENDING')`,
                [transactionId, partnerId, amount, commissionSetting.b2b_partner_rate, partnerCommission]
            );

            // Credit partner wallet
            const [partner] = await connection.query('SELECT user_id FROM partners WHERE id = ?', [partnerId]);
            if (partner.length > 0) {
                await creditWallet(connection, partner[0].user_id, partnerCommission, 'commission', transactionId);
            }
        }

    } catch (error) {
        console.error('Bill commission error:', error);
    }
}

/**
 * Helper function to credit wallet
 */
async function creditWallet(connection, userId, amount, referenceType, referenceId) {
    try {
        const [wallet] = await connection.query(
            'SELECT id, balance FROM wallets WHERE user_id = ?',
            [userId]
        );

        let walletId, currentBalance;

        if (wallet.length === 0) {
            const [result] = await connection.query(
                'INSERT INTO wallets (user_id, balance) VALUES (?, ?)',
                [userId, amount]
            );
            walletId = result.insertId;
            currentBalance = 0;
        } else {
            walletId = wallet[0].id;
            currentBalance = parseFloat(wallet[0].balance);
        }

        const newBalance = currentBalance + parseFloat(amount);

        await connection.query(
            'UPDATE wallets SET balance = ?, total_credited = total_credited + ? WHERE id = ?',
            [newBalance, amount, walletId]
        );

        await connection.query(
            `INSERT INTO wallet_transactions 
       (wallet_id, transaction_type, amount, balance_before, balance_after, reference_type, reference_id, description)
       VALUES (?, 'CREDIT', ?, ?, ?, ?, ?, ?)`,
            [walletId, amount, currentBalance, newBalance, referenceType, referenceId, `Commission for ${referenceType}`]
        );

    } catch (error) {
        console.error('Credit wallet error:', error);
    }
}

export default router;
