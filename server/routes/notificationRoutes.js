/**
 * Notification Routes
 * Handles user notifications
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
 * @route   GET /api/notifications
 * @desc    Get user notifications
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const { page = 1, limit = 20, unread_only } = req.query;
        const offset = (page - 1) * limit;

        let query = `
      SELECT * FROM notifications
      WHERE user_id = ?
    `;
        const params = [userId];

        if (unread_only === 'true') {
            query += ` AND is_read = FALSE`;
        }

        query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [notifications] = await connection.query(query, params);

        // Get unread count
        const [unreadCount] = await connection.query(
            'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
            [userId]
        );

        res.json({
            notifications,
            unread_count: unreadCount[0].count,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put('/:id/read', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const notificationId = req.params.id;

        const [result] = await connection.query(
            'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
            [notificationId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification marked as read' });

    } catch (error) {
        console.error('Mark notification read error:', error);
        res.status(500).json({ message: 'Failed to mark notification as read' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.put('/read-all', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;

        await connection.query(
            'UPDATE notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
            [userId]
        );

        res.json({ message: 'All notifications marked as read' });

    } catch (error) {
        console.error('Mark all read error:', error);
        res.status(500).json({ message: 'Failed to mark all notifications as read' });
    } finally {
        await connection.end();
    }
});

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    const connection = await getConnection();

    try {
        const userId = req.user.id;
        const notificationId = req.params.id;

        const [result] = await connection.query(
            'DELETE FROM notifications WHERE id = ? AND user_id = ?',
            [notificationId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification deleted' });

    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({ message: 'Failed to delete notification' });
    } finally {
        await connection.end();
    }
});

/**
 * Helper function to create notification (can be called from other modules)
 */
export async function createNotification(userId, title, message, type, actionUrl = null) {
    const connection = await getConnection();

    try {
        await connection.query(
            `INSERT INTO notifications (user_id, title, message, type, action_url)
       VALUES (?, ?, ?, ?, ?)`,
            [userId, title, message, type, actionUrl]
        );
    } catch (error) {
        console.error('Create notification error:', error);
    } finally {
        await connection.end();
    }
}

export default router;
