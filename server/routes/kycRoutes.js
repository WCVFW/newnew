import express from "express";
import multer from "multer";
import pool from "../db.js";
import { protect } from "../authMiddleware.js";

const router = express.Router();

// --- Multer Setup for Storing Files in Memory ---
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and PDFs are allowed."), false);
    }
  },
});

// Middleware to handle multer errors gracefully
const handleUpload = (req, res, next) => {
  const uploader = upload.fields([
    { name: "aadhaarFile", maxCount: 1 },
    { name: "panFile", maxCount: 1 },
    { name: "addressFile", maxCount: 1 },
  ]);

  uploader(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// POST /api/kyc/submit-all
router.post(
  "/submit-all",
  protect,
  handleUpload,
  async (req, res) => {
    const { aadhaar, pan, address } = req.body;
    const userId = req.user.id;

    if (!aadhaar || !pan || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!req.files || !req.files.aadhaarFile || !req.files.panFile || !req.files.addressFile) {
      return res.status(400).json({ message: "All documents are required." });
    }

    let conn;
    try {
      conn = await pool.getConnection();

      // Helper to get file metadata
      const getMeta = (file) => JSON.stringify({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });

      const aadhaarFile = req.files.aadhaarFile[0];
      const panFile = req.files.panFile[0];
      const addressFile = req.files.addressFile[0];

      await conn.beginTransaction();

      // Insert into kyc table with BLOB data
      await conn.execute(
        `INSERT INTO kyc (
          user_id, aadhaar_number, pan_number, address, 
          aadhaar_file_meta, pan_file_meta, address_file_meta,
          aadhaar_image, pan_image, address_image
        )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           aadhaar_number = VALUES(aadhaar_number),
           pan_number = VALUES(pan_number),
           address = VALUES(address),
           aadhaar_file_meta = VALUES(aadhaar_file_meta),
           pan_file_meta = VALUES(pan_file_meta),
           address_file_meta = VALUES(address_file_meta),
           aadhaar_image = VALUES(aadhaar_image),
           pan_image = VALUES(pan_image),
           address_image = VALUES(address_image)`,
        [
          userId, aadhaar, pan, address,
          getMeta(aadhaarFile), getMeta(panFile), getMeta(addressFile),
          aadhaarFile.buffer, panFile.buffer, addressFile.buffer
        ]
      );

      // Update user status
      await conn.execute(
        "UPDATE users SET kyc_status = 'PENDING' WHERE id = ?",
        [userId]
      );

      await conn.commit();
      res.status(200).json({ message: "KYC submitted successfully. Awaiting verification." });
    } catch (err) {
      console.error("KYC submission error:", err);
      if (conn) await conn.rollback();
      res.status(500).json({ message: "Server error during KYC submission." });
    } finally {
      if (conn) conn.release();
    }
  }
);

// GET /api/kyc/status
router.get("/status", protect, async (req, res) => {
  res.json({
    kyc_status: req.user.kyc_status,
  });
});

// GET /api/kyc/image/:userId/:type
// Serves the image directly from the database
router.get("/image/:userId/:type", async (req, res) => {
  const { userId, type } = req.params;

  if (!['aadhaar', 'pan', 'address'].includes(type)) {
    return res.status(400).send("Invalid image type");
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.execute(
      `SELECT ${type}_image as image, ${type}_file_meta as meta FROM kyc WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0 || !rows[0].image) {
      return res.status(404).send("Image not found");
    }

    const imageBuffer = rows[0].image;
    const meta = JSON.parse(rows[0].meta || '{}');

    res.setHeader('Content-Type', meta.mimetype || 'image/jpeg');
    res.send(imageBuffer);

  } catch (err) {
    console.error("Error serving image:", err);
    res.status(500).send("Error retrieving image");
  } finally {
    if (conn) conn.release();
  }
});

export default router;
