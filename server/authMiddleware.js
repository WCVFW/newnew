import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach full user info to the request from the database
      const conn = await pool.getConnection();
      const [users] = await conn.execute('SELECT id, name, email, phone, role, kyc_status FROM users WHERE id = ?', [decoded.userId]);
      conn.release();

      // Check if user still exists in the database
      if (!users[0]) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = users[0]; // The full user object
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // This handles the case where the header is missing or doesn't start with "Bearer"
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};