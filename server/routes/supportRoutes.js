/**
 * Support Routes
 * Handles support tickets and customer service
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
 * @route   POST /api/support/ticket
 * @desc    Create a support ticket
 * @access  Private
 */
router.post('/ticket', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const { subject, description, category, priority } = req.body;
        const userId = req.user.id;

        if (!subject || !description) {
            return res.status(400).json({ message: 'Subject and description are required' });
        }

        // Generate unique ticket number
        const ticketNumber = `TKT${Date.now()}${userId}`;

        const [result] = await connection.query(
            `INSERT INTO support_tickets 
       (user_id, ticket_number, subject, description, category, priority, status)
       VALUES (?, ?, ?, ?, ?, ?, 'OPEN')`,
            [userId, ticketNumber, subject, description, category || 'other', priority || 'MEDIUM']
        );

        res.status(201).json({
            message: 'Support ticket created successfully',
            ticketId: result.insertId,
            ticketNumber
        });

    } catch (error) {
        console.error('Create ticket error:', error);
        res.status(500).json({ message: 'Failed to create support ticket' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/support/tickets
 * @desc    Get user's support tickets
 * @access  Private
 */
router.get('/tickets', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { status, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        let query = `
      SELECT id, ticket_number, subject, category, priority, status, created_at, updated_at
      FROM support_tickets
      WHERE user_id = ?
    `;
        const params = [userId];

        if (status) {
            query += ` AND status = ?`;
            params.push(status.toUpperCase());
        }

        query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [tickets] = await connection.query(query, params);

        const [countResult] = await connection.query(
            'SELECT COUNT(*) as total FROM support_tickets WHERE user_id = ?',
            [userId]
        );

        res.json({
            tickets,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total
            }
        });

    } catch (error) {
        console.error('Get tickets error:', error);
        res.status(500).json({ message: 'Failed to fetch support tickets' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   GET /api/support/ticket/:id
 * @desc    Get ticket details with replies
 * @access  Private
 */
router.get('/ticket/:id', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const ticketId = req.params.id;

        // Get ticket details
        const [tickets] = await connection.query(
            `SELECT st.*, u.name as user_name, u.email as user_email
       FROM support_tickets st
       JOIN users u ON st.user_id = u.id
       WHERE st.id = ? AND st.user_id = ?`,
            [ticketId, userId]
        );

        if (tickets.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Get ticket replies
        const [replies] = await connection.query(
            `SELECT str.*, u.name as user_name
       FROM support_ticket_replies str
       JOIN users u ON str.user_id = u.id
       WHERE str.ticket_id = ?
       ORDER BY str.created_at ASC`,
            [ticketId]
        );

        res.json({
            ticket: tickets[0],
            replies
        });

    } catch (error) {
        console.error('Get ticket details error:', error);
        res.status(500).json({ message: 'Failed to fetch ticket details' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   POST /api/support/ticket/:id/reply
 * @desc    Reply to a ticket
 * @access  Private
 */
router.post('/ticket/:id/reply', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const ticketId = req.params.id;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Verify ticket belongs to user
        const [tickets] = await connection.query(
            'SELECT id FROM support_tickets WHERE id = ? AND user_id = ?',
            [ticketId, userId]
        );

        if (tickets.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Add reply
        await connection.query(
            `INSERT INTO support_ticket_replies 
       (ticket_id, user_id, message, is_staff_reply)
       VALUES (?, ?, ?, FALSE)`,
            [ticketId, userId, message]
        );

        // Update ticket status to IN_PROGRESS if it was OPEN
        await connection.query(
            `UPDATE support_tickets 
       SET status = CASE WHEN status = 'OPEN' THEN 'IN_PROGRESS' ELSE status END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
            [ticketId]
        );

        res.json({ message: 'Reply added successfully' });

    } catch (error) {
        console.error('Add reply error:', error);
        res.status(500).json({ message: 'Failed to add reply' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   PUT /api/support/ticket/:id/close
 * @desc    Close a ticket
 * @access  Private
 */
router.put('/ticket/:id/close', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const ticketId = req.params.id;

        const [result] = await connection.query(
            `UPDATE support_tickets 
       SET status = 'CLOSED', updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
            [ticketId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket closed successfully' });

    } catch (error) {
        console.error('Close ticket error:', error);
        res.status(500).json({ message: 'Failed to close ticket' });
    } finally {
        await connection.end();
    }
});

export default router;
