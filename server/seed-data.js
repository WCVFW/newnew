import pool from "./db.js";
import bcrypt from "bcrypt";

async function seedData() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("🌱 Seeding test data...");

        // 1. Create Admin User
        const adminPass = await bcrypt.hash("admin123", 10);
        await conn.execute(`
      INSERT INTO users (name, email, phone, password, role, kyc_status)
      VALUES ('Admin User', 'admin@test.com', '9999999999', ?, 'ADMIN', 'APPROVED')
      ON DUPLICATE KEY UPDATE name=name
    `, [adminPass]);
        console.log("✅ Admin user created (admin@test.com / admin123)");

        // 2. Create Pending User
        const userPass = await bcrypt.hash("user123", 10);
        const [userResult] = await conn.execute(`
      INSERT INTO users (name, email, phone, password, role, kyc_status)
      VALUES ('Pending User', 'pending@test.com', '8888888888', ?, 'USER', 'PENDING')
      ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)
    `, [userPass]);
        const pendingUserId = userResult.insertId;
        console.log(`✅ Pending user created (pending@test.com / user123) ID: ${pendingUserId}`);

        // 3. Create KYC Record for Pending User
        const aadhaarMeta = JSON.stringify({ originalname: "aadhaar.jpg", filename: "test-aadhaar.jpg" });
        const panMeta = JSON.stringify({ originalname: "pan.jpg", filename: "test-pan.jpg" });
        const addressMeta = JSON.stringify({ originalname: "address.jpg", filename: "test-address.jpg" });

        await conn.execute(`
      INSERT INTO kyc (user_id, aadhaar_number, pan_number, address, aadhaar_file_meta, pan_file_meta, address_file_meta)
      VALUES (?, '123456789012', 'ABCDE1234F', '123 Test St, Test City', ?, ?, ?)
      ON DUPLICATE KEY UPDATE address=VALUES(address)
    `, [pendingUserId, aadhaarMeta, panMeta, addressMeta]);
        console.log("✅ KYC record created for Pending User");

        console.log("🎉 Seeding complete!");

    } catch (err) {
        console.error("❌ Seeding failed:", err);
    } finally {
        if (conn) conn.release();
        process.exit();
    }
}

seedData();
