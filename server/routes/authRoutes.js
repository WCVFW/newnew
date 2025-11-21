import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../emailService.js";
import { protect } from "../authMiddleware.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// A simple password strength check (e.g., at least 8 characters)
const isPasswordStrong = (password) => {
  return password && password.length >= 8;
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // Check if user already exists
    const [existingUser] = await conn.execute("SELECT id FROM users WHERE email = ? OR phone = ?", [email, phone]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "An account with this email or phone number already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await conn.execute("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, hashedPassword]);

    const userId = result.insertId;

    // --- Automatically log in the user by creating a JWT token ---
    const [newUserRows] = await conn.execute("SELECT id, name, email, phone, role, kyc_status FROM users WHERE id = ?", [userId]);
    const newUser = newUserRows[0];

    const payload = { userId: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: newUser.role, kyc_status: newUser.kyc_status },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error during registration" });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const [users] = await conn.execute("SELECT id, name, email, phone, password, role, kyc_status FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" }); // User not found
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = { userId: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, kyc_status: user.kyc_status },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  } finally {
    if (conn) conn.release();
  }
});

// GET /api/auth/me - Get the currently logged-in user
router.get("/me", protect, async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    role: req.user.role,
    kyc_status: req.user.kyc_status,
  });
});

// PUT /api/auth/profile - Update current user profile
router.put("/profile", protect, async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // Check if email is being changed to one that already exists
    if (email !== req.user.email) {
      const [existing] = await conn.execute("SELECT id FROM users WHERE email = ? AND id != ?", [email, userId]);
      if (existing.length > 0) {
        return res.status(409).json({ message: "Email is already in use." });
      }
    }

    await conn.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, userId]);

    // Fetch updated user to return
    const [updatedUsers] = await conn.execute("SELECT id, name, email, phone, role, kyc_status FROM users WHERE id = ?", [userId]);
    const updatedUser = updatedUsers[0];

    res.json({
      message: "Profile updated successfully.",
      user: updatedUser
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error updating profile." });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const [users] = await conn.execute("SELECT id, email, password_reset_expires FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.json({ message: "If an account with that email exists, a password reset link has been sent." });
    }

    const user = users[0];

    if (user.password_reset_expires && new Date(user.password_reset_expires) > new Date()) {
      return res.json({ message: "If an account with that email exists, a password reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour

    await conn.execute("UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE id = ?", [passwordResetToken, passwordResetExpires, user.id]);
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: "If an account with that email exists, a password reset link has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Server error during password reset process." });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ message: "Token and new password are required." });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  let conn;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    conn = await pool.getConnection();
    const [users] = await conn.execute("SELECT id FROM users WHERE password_reset_token = ? AND password_reset_expires > NOW()", [hashedToken]);

    if (users.length === 0) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    const user = users[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await conn.execute("UPDATE users SET password = ?, password_reset_token = NULL, password_reset_expires = NULL WHERE id = ?", [hashedPassword, user.id]);

    res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset password error:", err.message);
    res.status(500).json({ message: "Server error during password reset." });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
