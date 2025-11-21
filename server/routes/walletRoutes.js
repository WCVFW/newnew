/**
 * Wallet Routes
 * Handles wallet operations, transfers, and transactions
 */

import express from 'express';
import pool from '../db.js';
import { protect as authMiddleware } from '../authMiddleware.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * @route   GET /api/wallet/balance
 * @desc    Get wallet balance
 * @access  Private
 */
router.get('/balance', authMiddleware, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const userId = req.user.id;

        const [wallet] = await connection.query(
            'SELECT id, balance, locked_balance, total_credited, total_debited FROM wallets WHERE user_id = ?',
            [userId]
        );

        if (wallet.length === 0) {
            // Create wallet if doesn't exist
            await connection.query(
                'INSERT INTO wallets (user_id, balance) VALUES (?, 0.00)',
                [userId]
            );
            return res.json({ balance: 0, locked_balance: 0, total_credited: 0, total_debited: 0 });
        }

        res.json(wallet[0]);

    } catch (error) {
        console.error('Get wallet balance error:', error);
        res.status(500).json({ message: 'Failed to fetch wallet balance' });
    } finally {
        if (connection) connection.release();
    }
});

/**
 * @route   GET /api/wallet/transactions
 * @desc    Get wallet transaction history (Ledger Entries)
 * @access  Private
 */
router.get('/transactions', authMiddleware, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const userId = req.user.id;
        const { page = 1, limit = 20, type } = req.query;
        const offset = (page - 1) * limit;

        // Get Ledger Account ID
        const [ledgerAccount] = await connection.query(
            'SELECT id FROM ledger_accounts WHERE user_id = ?',
            [userId]
        );

        if (ledgerAccount.length === 0) {
            return res.json({ transactions: [], pagination: { page: 1, limit: 20, total: 0 } });
        }

        const ledgerId = ledgerAccount[0].id;

        let query = `
            SELECT * FROM ledger_entries
            WHERE ledger_account_id = ?
        `;
        const params = [ledgerId];

        if (type) {
            query += ` AND type = ?`;
            params.push(type.toUpperCase());
        }

        query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [transactions] = await connection.query(query, params);

        // Get total count
        const [countResult] = await connection.query(
            'SELECT COUNT(*) as total FROM ledger_entries WHERE ledger_account_id = ?',
            [ledgerId]
        );

        res.json({
            transactions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total
            }
        });

    } catch (error) {
        console.error('Get wallet transactions error:', error);
        res.status(500).json({ message: 'Failed to fetch wallet transactions' });
    } finally {
        if (connection) connection.release();
    }
});

/**
 * @route   POST /api/wallet/add-money/initiate
 * @desc    Initiate Add Money (Create Razorpay Order)
 * @access  Private
 */
router.post('/add-money/initiate', authMiddleware, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const userId = req.user.id;
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: "INR",
            receipt: `receipt_wallet_${userId}_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ message: 'Failed to create Razorpay order' });
        }

        // Store transaction request
        await connection.query(
            `INSERT INTO razorpay_transactions 
            (user_id, order_id, amount, status) 
            VALUES (?, ?, ?, 'PENDING')`,
            [userId, order.id, amount]
        );

        res.json({
            order_id: order.id,
            amount: amount,
            currency: "INR",
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('Initiate add money error:', error);
        res.status(500).json({ message: 'Failed to initiate transaction' });
    } finally {
        if (connection) connection.release();
    }
});

/**
 * @route   POST /api/wallet/add-money/verify
 * @desc    Verify Razorpay Payment and Credit Wallet
 * @access  Private
 */
router.post('/add-money/verify', authMiddleware, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const userId = req.user.id;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment details' });
        }

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Invalid signature' });
        }

        // Start Transaction
        await connection.beginTransaction();

        try {
            // 1. Update Razorpay Transaction Status
            const [txResult] = await connection.query(
                `UPDATE razorpay_transactions 
                 SET payment_id = ?, signature = ?, status = 'SUCCESS' 
                 WHERE order_id = ? AND user_id = ?`,
                [razorpay_payment_id, razorpay_signature, razorpay_order_id, userId]
            );

            if (txResult.affectedRows === 0) {
                // Check if already processed
                const [existing] = await connection.query(
                    'SELECT status FROM razorpay_transactions WHERE order_id = ?',
                    [razorpay_order_id]
                );
                if (existing.length > 0 && existing[0].status === 'SUCCESS') {
                    await connection.rollback();
                    return res.json({ message: 'Payment already processed' });
                }
                throw new Error('Transaction record not found');
            }

            // Get transaction amount
            const [txRecord] = await connection.query(
                'SELECT amount FROM razorpay_transactions WHERE order_id = ?',
                [razorpay_order_id]
            );
            const amount = parseFloat(txRecord[0].amount);

            // 2. Update Wallet Balance
            // Check if wallet exists
            let [wallet] = await connection.query(
                'SELECT id, balance FROM wallets WHERE user_id = ? FOR UPDATE',
                [userId]
            );

            let walletId;
            let currentBalance = 0;
            if (wallet.length === 0) {
                const [newWallet] = await connection.query(
                    'INSERT INTO wallets (user_id, balance) VALUES (?, 0.00)',
                    [userId]
                );
                walletId = newWallet.insertId;
            } else {
                walletId = wallet[0].id;
                currentBalance = parseFloat(wallet[0].balance);
            }

            const newBalance = currentBalance + amount;

            await connection.query(
                'UPDATE wallets SET balance = ?, total_credited = total_credited + ? WHERE id = ?',
                [newBalance, amount, walletId]
            );

            // 3. Create/Get Ledger Account
            let [ledger] = await connection.query(
                'SELECT id FROM ledger_accounts WHERE user_id = ?',
                [userId]
            );

            let ledgerId;
            if (ledger.length === 0) {
                const [newLedger] = await connection.query(
                    'INSERT INTO ledger_accounts (user_id) VALUES (?)',
                    [userId]
                );
                ledgerId = newLedger.insertId;
            } else {
                ledgerId = ledger[0].id;
            }

            // 4. Add Ledger Entry
            await connection.query(
                `INSERT INTO ledger_entries 
                (ledger_account_id, type, amount, balance_after, description, transaction_reference) 
                VALUES (?, 'CREDIT', ?, ?, ?, ?)`,
                [ledgerId, amount, newBalance, 'Money added to wallet', razorpay_payment_id]
            );

            await connection.commit();

            res.json({
                message: 'Payment verified and wallet credited',
                amount: amount,
                balance: newBalance
            });

        } catch (error) {
            await connection.rollback();
            throw error;
        }

    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ message: 'Payment verification failed' });
    } finally {
        if (connection) connection.release();
    }
});

/**
 * @route   POST /api/wallet/deduct
 * @desc    Deduct money for recharge/bill
 * @access  Private
 */
router.post('/deduct', authMiddleware, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const userId = req.user.id;
        const { amount, description, reference } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        await connection.beginTransaction();

        try {
            // Check Balance
            const [wallet] = await connection.query(
                'SELECT id, balance FROM wallets WHERE user_id = ? FOR UPDATE',
                [userId]
            );

            if (wallet.length === 0 || parseFloat(wallet[0].balance) < parseFloat(amount)) {
                await connection.rollback();
                return res.status(400).json({ message: 'Insufficient wallet balance' });
            }

            const walletId = wallet[0].id;
            const currentBalance = parseFloat(wallet[0].balance);
            const newBalance = currentBalance - parseFloat(amount);

            // Deduct from Wallet
            await connection.query(
                'UPDATE wallets SET balance = ?, total_debited = total_debited + ? WHERE id = ?',
                [newBalance, amount, walletId]
            );

            // Get Ledger Account
            let [ledger] = await connection.query(
                'SELECT id FROM ledger_accounts WHERE user_id = ?',
                [userId]
            );

            let ledgerId;
            if (ledger.length === 0) {
                const [newLedger] = await connection.query(
                    'INSERT INTO ledger_accounts (user_id) VALUES (?)',
                    [userId]
                );
                ledgerId = newLedger.insertId;
            } else {
                ledgerId = ledger[0].id;
            }

            // Add Ledger Entry
            await connection.query(
                `INSERT INTO ledger_entries 
                (ledger_account_id, type, amount, balance_after, description, transaction_reference) 
                VALUES (?, 'DEBIT', ?, ?, ?, ?)`,
                [ledgerId, amount, newBalance, description || 'Wallet deduction', reference || 'system_deduction']
            );

            await connection.commit();

            res.json({
                message: 'Amount deducted successfully',
                balance: newBalance
            });

        } catch (error) {
            await connection.rollback();
            throw error;
        }

    } catch (error) {
        console.error('Wallet deduction error:', error);
        res.status(500).json({ message: 'Failed to deduct amount' });
    } finally {
        if (connection) connection.release();
    }
});

/**
 * @route   POST /api/wallet/refund
 * @desc    Refund money to wallet
 * @access  Private (Admin/System)
 */
router.post('/refund', authMiddleware, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const userId = req.user.id; // Or target user from body if admin
        const { amount, description, reference } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        await connection.beginTransaction();

        try {
            // Get Wallet
            let [wallet] = await connection.query(
                'SELECT id, balance FROM wallets WHERE user_id = ? FOR UPDATE',
                [userId]
            );

            let walletId;
            let currentBalance = 0;
            if (wallet.length === 0) {
                const [newWallet] = await connection.query(
                    'INSERT INTO wallets (user_id, balance) VALUES (?, 0.00)',
                    [userId]
                );
                walletId = newWallet.insertId;
            } else {
                walletId = wallet[0].id;
                currentBalance = parseFloat(wallet[0].balance);
            }

            const newBalance = currentBalance + parseFloat(amount);

            // Credit Wallet
            await connection.query(
                'UPDATE wallets SET balance = ?, total_credited = total_credited + ? WHERE id = ?',
                [newBalance, amount, walletId]
            );

            // Get Ledger Account
            let [ledger] = await connection.query(
                'SELECT id FROM ledger_accounts WHERE user_id = ?',
                [userId]
            );

            let ledgerId;
            if (ledger.length === 0) {
                const [newLedger] = await connection.query(
                    'INSERT INTO ledger_accounts (user_id) VALUES (?)',
                    [userId]
                );
                ledgerId = newLedger.insertId;
            } else {
                ledgerId = ledger[0].id;
            }

            // Add Ledger Entry
            await connection.query(
                `INSERT INTO ledger_entries 
                (ledger_account_id, type, amount, balance_after, description, transaction_reference) 
                VALUES (?, 'CREDIT', ?, ?, ?, ?)`,
                [ledgerId, amount, newBalance, description || 'Refund', reference || 'system_refund']
            );

            await connection.commit();

            res.json({ message: 'Refund processed successfully', balance: newBalance });

        } catch (error) {
            await connection.rollback();
            throw error;
        }

    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({ message: 'Failed to process refund' });
    } finally {
        if (connection) connection.release();
    }
});

export default router;
