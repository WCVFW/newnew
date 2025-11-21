import express from "express";
import pool from "../db.js";
import { protect } from "../authMiddleware.js";

const router = express.Router();

// Middleware to ensure the user is an admin
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin only." });
    }
};

// GET /api/admin/stats
router.get("/stats", protect, adminOnly, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const [employeeRows] = await conn.execute(
            "SELECT COUNT(*) as count FROM users WHERE role = 'EMPLOYEE'"
        );
        const totalEmployees = employeeRows[0].count;

        const [revenueRows] = await conn.execute(
            "SELECT SUM(plan_amount) as total FROM transactions WHERE status = 'COMPLETED' OR recharge_status = 'SUCCESS'"
        );
        const totalRevenue = revenueRows[0].total || 0;

        const [kycRows] = await conn.execute(
            "SELECT COUNT(*) as count FROM users WHERE kyc_status = 'PENDING'"
        );
        const pendingKycCount = kycRows[0].count;

        const [commissionRows] = await conn.execute(
            "SELECT SUM(company_commission) as total FROM transactions WHERE status = 'COMPLETED' OR recharge_status = 'SUCCESS'"
        );
        const totalCommission = commissionRows[0].total || 0;

        res.json({
            totalEmployees,
            totalRevenue,
            pendingKycCount,
            totalCommission
        });

    } catch (err) {
        console.error("Error fetching admin stats:", err);
        res.status(500).json({ message: "Server error fetching statistics." });
    } finally {
        if (conn) conn.release();
    }
});

// GET /api/admin/kyc-pending
router.get("/kyc-pending", protect, adminOnly, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.execute(`
      SELECT 
        u.id, u.name, u.email, u.phone, 
        k.aadhaar_number AS aadhaar, 
        k.pan_number AS pan, 
        k.address
      FROM users u
      JOIN kyc k ON u.id = k.user_id
      WHERE u.kyc_status = 'PENDING'
    `);

        const requests = rows.map((row) => {
            const baseUrl = "http://localhost:3000/api/kyc/image";
            const docs = [
                `${baseUrl}/${row.id}/aadhaar`,
                `${baseUrl}/${row.id}/pan`,
                `${baseUrl}/${row.id}/address`
            ];

            return {
                id: row.id,
                name: row.name,
                email: row.email,
                phone: row.phone,
                aadhaar: row.aadhaar,
                pan: row.pan,
                address: row.address,
                document_urls: JSON.stringify(docs),
            };
        });

        res.json(requests);
    } catch (err) {
        console.error("Error fetching pending KYC:", err);
        res.status(500).json({ message: "Server error fetching KYC requests." });
    } finally {
        if (conn) conn.release();
    }
});

// POST /api/admin/kyc-approve
router.post("/kyc-approve", protect, adminOnly, async (req, res) => {
    const { userId, action } = req.body;

    if (!userId || !["APPROVED", "REJECTED"].includes(action)) {
        return res.status(400).json({ message: "Invalid request parameters." });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const status = action === "APPROVED" ? "APPROVED" : "REJECTED";
        await conn.execute("UPDATE users SET kyc_status = ? WHERE id = ?", [status, userId]);
        res.json({ message: `KYC ${status.toLowerCase()} successfully.` });
    } catch (err) {
        console.error("Error updating KYC status:", err);
        res.status(500).json({ message: "Server error updating KYC status." });
    } finally {
        if (conn) conn.release();
    }
});

// GET /api/admin/transactions
router.get("/transactions", protect, adminOnly, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.execute(`
      SELECT 
        t.id, 
        u.name AS user_name, 
        t.mobile_number, 
        t.operator, 
        t.plan_amount AS amount, 
        t.status, 
        t.created_at
      FROM transactions t
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "Server error fetching transactions." });
    } finally {
        if (conn) conn.release();
    }
});

// GET /api/admin/partners
router.get("/partners", protect, adminOnly, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.execute(`
            SELECT p.*, u.name, u.email, u.phone
            FROM partners p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching partners:", err);
        res.status(500).json({ message: "Server error fetching partners." });
    } finally {
        if (conn) conn.release();
    }
});

// PUT /api/admin/partner/:id/approve
router.put("/partner/:id/approve", protect, adminOnly, async (req, res) => {
    const partnerId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.execute(
            "UPDATE partners SET kyc_status = 'APPROVED', status = 'ACTIVE' WHERE id = ?",
            [partnerId]
        );
        res.json({ message: "Partner approved successfully" });
    } catch (err) {
        console.error("Error approving partner:", err);
        res.status(500).json({ message: "Server error approving partner." });
    } finally {
        if (conn) conn.release();
    }
});

// PUT /api/admin/partner/:id/reject
router.put("/partner/:id/reject", protect, adminOnly, async (req, res) => {
    const partnerId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.execute(
            "UPDATE partners SET kyc_status = 'REJECTED', status = 'INACTIVE' WHERE id = ?",
            [partnerId]
        );
        res.json({ message: "Partner rejected" });
    } catch (err) {
        console.error("Error rejecting partner:", err);
        res.status(500).json({ message: "Server error rejecting partner." });
    } finally {
        if (conn) conn.release();
    }
});

// PUT /api/admin/partner/:id/commission
router.put("/partner/:id/commission", protect, adminOnly, async (req, res) => {
    const partnerId = req.params.id;
    const { commission_rate } = req.body;

    if (!commission_rate || commission_rate < 0 || commission_rate > 100) {
        return res.status(400).json({ message: "Invalid commission rate" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.execute(
            "UPDATE partners SET commission_rate = ? WHERE id = ?",
            [commission_rate, partnerId]
        );
        res.json({ message: "Commission rate updated successfully" });
    } catch (err) {
        console.error("Error updating commission:", err);
        res.status(500).json({ message: "Server error updating commission." });
    } finally {
        if (conn) conn.release();
    }
});

// GET /api/admin/withdrawals
router.get("/withdrawals", protect, adminOnly, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.execute(`
            SELECT w.*, u.name, u.email
            FROM withdrawals w
            JOIN users u ON w.user_id = u.id
            ORDER BY w.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching withdrawals:", err);
        res.status(500).json({ message: "Server error fetching withdrawals." });
    } finally {
        if (conn) conn.release();
    }
});

// PUT /api/admin/withdrawal/:id/approve
router.put("/withdrawal/:id/approve", protect, adminOnly, async (req, res) => {
    const withdrawalId = req.params.id;
    const { transaction_ref } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [withdrawals] = await conn.execute(
            "SELECT user_id, amount FROM withdrawals WHERE id = ?",
            [withdrawalId]
        );

        if (withdrawals.length === 0) {
            await conn.rollback();
            return res.status(404).json({ message: "Withdrawal not found" });
        }

        const { user_id, amount } = withdrawals[0];

        await conn.execute(
            `UPDATE withdrawals 
             SET status = 'COMPLETED', processed_by = ?, processed_at = NOW(), transaction_ref = ?
             WHERE id = ?`,
            [req.user.id, transaction_ref, withdrawalId]
        );

        await conn.execute(
            `UPDATE wallets 
             SET balance = balance - ?, locked_balance = locked_balance - ?, total_debited = total_debited + ?
             WHERE user_id = ?`,
            [amount, amount, amount, user_id]
        );

        await conn.commit();
        res.json({ message: "Withdrawal approved successfully" });
    } catch (err) {
        if (conn) await conn.rollback();
        console.error("Error approving withdrawal:", err);
        res.status(500).json({ message: "Server error approving withdrawal." });
    } finally {
        if (conn) conn.release();
    }
});

// PUT /api/admin/withdrawal/:id/reject
router.put("/withdrawal/:id/reject", protect, adminOnly, async (req, res) => {
    const withdrawalId = req.params.id;
    const { admin_notes } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [withdrawals] = await conn.execute(
            "SELECT user_id, amount FROM withdrawals WHERE id = ?",
            [withdrawalId]
        );

        if (withdrawals.length === 0) {
            await conn.rollback();
            return res.status(404).json({ message: "Withdrawal not found" });
        }

        const { user_id, amount } = withdrawals[0];

        await conn.execute(
            `UPDATE withdrawals 
             SET status = 'REJECTED', processed_by = ?, processed_at = NOW(), admin_notes = ?
             WHERE id = ?`,
            [req.user.id, admin_notes, withdrawalId]
        );

        await conn.execute(
            "UPDATE wallets SET locked_balance = locked_balance - ? WHERE user_id = ?",
            [amount, user_id]
        );

        await conn.commit();
        res.json({ message: "Withdrawal rejected" });
    } catch (err) {
        if (conn) await conn.rollback();
        console.error("Error rejecting withdrawal:", err);
        res.status(500).json({ message: "Server error rejecting withdrawal." });
    } finally {
        if (conn) conn.release();
    }
});

export default router;
