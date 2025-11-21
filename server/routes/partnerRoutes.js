/**
 * Partner Routes
 * Handles all B2B partner-related operations
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
        password: '123456',
        database: 'recharge_db'
    });
}

/**
 * @route   POST /api/partner/register
 * @desc    Register as a partner
 * @access  Private (USER role)
 */
router.post('/register', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const { business_name, business_type, pan_number, gst_number } = req.body;
        const userId = req.user.id;

        // Check if user is already a partner
        const [existing] = await connection.query(
            'SELECT id FROM partners WHERE user_id = ?',
            [userId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'User is already registered as a partner' });
        }

        // Create partner record
        const [result] = await connection.query(
            `INSERT INTO partners (user_id, business_name, business_type, pan_number, gst_number, status, kyc_status)
       VALUES (?, ?, ?, ?, ?, 'ACTIVE', 'PENDING')`,
            [userId, business_name, business_type, pan_number, gst_number]
        );

        // Update user role to PARTNER
        await connection.query(
            'UPDATE users SET role = ? WHERE id = ?',
            ['PARTNER', userId]
        );

        // Create wallet for partner
        await connection.query(
            'INSERT INTO wallets (user_id, balance) VALUES (?, 0.00) ON DUPLICATE KEY UPDATE user_id=user_id',
            [userId]
        );

        res.status(201).json({
            message: 'Partner registration successful. KYC approval pending.',
            partnerId: result.insertId
        });

    } catch (error) {
        console.error('Partner registration error:', error);
        res.status(500).json({ message: 'Failed to register as partner', error: error.message });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/partner/profile
 * @desc    Get partner profile
 * @access  Private (PARTNER role)
 */
router.get('/profile', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;

        const [partners] = await connection.query(
            `SELECT p.*, u.name, u.email, u.phone 
       FROM partners p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?`,
            [userId]
        );

        if (partners.length === 0) {
            return res.status(404).json({ message: 'Partner profile not found' });
        }

        res.json(partners[0]);

    } catch (error) {
        console.error('Get partner profile error:', error);
        res.status(500).json({ message: 'Failed to fetch partner profile' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   PUT /api/partner/profile
 * @desc    Update partner profile
 * @access  Private (PARTNER role)
 */
router.put('/profile', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { business_name, business_type, pan_number, gst_number } = req.body;

        const [result] = await connection.query(
            `UPDATE partners 
       SET business_name = ?, business_type = ?, pan_number = ?, gst_number = ?
       WHERE user_id = ?`,
            [business_name, business_type, pan_number, gst_number, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        res.json({ message: 'Partner profile updated successfully' });

    } catch (error) {
        console.error('Update partner profile error:', error);
        res.status(500).json({ message: 'Failed to update partner profile' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/partner/customers
 * @desc    Get list of partner's customers
 * @access  Private (PARTNER role)
 */
router.get('/customers', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;

        // Get partner ID
        const [partners] = await connection.query(
            'SELECT id FROM partners WHERE user_id = ?',
            [userId]
        );

        if (partners.length === 0) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        const partnerId = partners[0].id;

        // Get customers
        const [customers] = await connection.query(
            `SELECT u.id, u.name, u.email, u.phone, pc.added_at,
              COUNT(t.id) as total_transactions,
              COALESCE(SUM(t.total_amount), 0) as total_business
       FROM partner_customers pc
       JOIN users u ON pc.customer_id = u.id
       LEFT JOIN transactions t ON t.user_id = u.id
       WHERE pc.partner_id = ?
       GROUP BY u.id, u.name, u.email, u.phone, pc.added_at
       ORDER BY pc.added_at DESC`,
            [partnerId]
        );

        res.json({ customers });

    } catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({ message: 'Failed to fetch customers' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   POST /api/partner/customers
 * @desc    Add a customer to partner
 * @access  Private (PARTNER role)
 */
router.post('/customers', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { customer_email } = req.body;

        // Get partner ID
        const [partners] = await connection.query(
            'SELECT id FROM partners WHERE user_id = ?',
            [userId]
        );

        if (partners.length === 0) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        const partnerId = partners[0].id;

        // Find customer by email
        const [customers] = await connection.query(
            'SELECT id FROM users WHERE email = ? AND role = ?',
            [customer_email, 'USER']
        );

        if (customers.length === 0) {
            return res.status(404).json({ message: 'Customer not found or not a regular user' });
        }

        const customerId = customers[0].id;

        // Add customer to partner
        await connection.query(
            'INSERT INTO partner_customers (partner_id, customer_id) VALUES (?, ?)',
            [partnerId, customerId]
        );

        res.status(201).json({ message: 'Customer added successfully' });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Customer already added to this partner' });
        }
        console.error('Add customer error:', error);
        res.status(500).json({ message: 'Failed to add customer' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/partner/earnings
 * @desc    Get partner earnings summary
 * @access  Private (PARTNER role)
 */
router.get('/earnings', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;

        // Get partner ID
        const [partners] = await connection.query(
            'SELECT id FROM partners WHERE user_id = ?',
            [userId]
        );

        if (partners.length === 0) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        const partnerId = partners[0].id;

        // Get total earnings
        const [earnings] = await connection.query(
            `SELECT 
        COUNT(*) as total_commissions,
        COALESCE(SUM(commission_amount), 0) as total_earned,
        COALESCE(SUM(CASE WHEN status = 'CREDITED' THEN commission_amount ELSE 0 END), 0) as credited,
        COALESCE(SUM(CASE WHEN status = 'PENDING' THEN commission_amount ELSE 0 END), 0) as pending
       FROM commissions
       WHERE partner_id = ?`,
            [partnerId]
        );

        // Get wallet balance
        const [wallet] = await connection.query(
            'SELECT balance FROM wallets WHERE user_id = ?',
            [userId]
        );

        res.json({
            earnings: earnings[0],
            wallet_balance: wallet[0]?.balance || 0
        });

    } catch (error) {
        console.error('Get earnings error:', error);
        res.status(500).json({ message: 'Failed to fetch earnings' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/partner/commissions
 * @desc    Get partner commission history
 * @access  Private (PARTNER role)
 */
router.get('/commissions', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        // Get partner ID
        const [partners] = await connection.query(
            'SELECT id FROM partners WHERE user_id = ?',
            [userId]
        );

        if (partners.length === 0) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        const partnerId = partners[0].id;

        // Get commission history
        const [commissions] = await connection.query(
            `SELECT c.*, t.mobile_number, t.operator, t.plan_amount, t.created_at as transaction_date
       FROM commissions c
       JOIN transactions t ON c.transaction_id = t.id
       WHERE c.partner_id = ?
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
            [partnerId, parseInt(limit), parseInt(offset)]
        );

        // Get total count
        const [countResult] = await connection.query(
            'SELECT COUNT(*) as total FROM commissions WHERE partner_id = ?',
            [partnerId]
        );

        res.json({
            commissions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total
            }
        });

    } catch (error) {
        console.error('Get commissions error:', error);
        res.status(500).json({ message: 'Failed to fetch commission history' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   POST /api/partner/withdrawal-request
 * @desc    Request withdrawal
 * @access  Private (PARTNER role)
 */
router.post('/withdrawal-request', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { amount, bank_account_number, ifsc_code, account_holder_name, upi_id, withdrawal_mode } = req.body;

        // Check wallet balance
        const [wallet] = await connection.query(
            'SELECT balance FROM wallets WHERE user_id = ?',
            [userId]
        );

        if (!wallet[0] || wallet[0].balance < amount) {
            return res.status(400).json({ message: 'Insufficient wallet balance' });
        }

        // Create withdrawal request
        await connection.query(
            `INSERT INTO withdrawals 
       (user_id, amount, bank_account_number, ifsc_code, account_holder_name, upi_id, withdrawal_mode, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
            [userId, amount, bank_account_number, ifsc_code, account_holder_name, upi_id, withdrawal_mode]
        );

        // Lock the amount in wallet
        await connection.query(
            'UPDATE wallets SET locked_balance = locked_balance + ? WHERE user_id = ?',
            [amount, userId]
        );

        res.status(201).json({ message: 'Withdrawal request submitted successfully' });

    } catch (error) {
        console.error('Withdrawal request error:', error);
        res.status(500).json({ message: 'Failed to submit withdrawal request' });
    } finally {
        await connection.end();
    }
});

export default router;
