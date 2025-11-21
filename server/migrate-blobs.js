import pool from "./db.js";

async function migrateDb() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("🔄 Migrating database to store images as BLOBs...");

        // Add LONGBLOB columns for file data
        await conn.query(`
      ALTER TABLE kyc 
      ADD COLUMN aadhaar_image LONGBLOB,
      ADD COLUMN pan_image LONGBLOB,
      ADD COLUMN address_image LONGBLOB
    `);

        console.log("✅ Columns added successfully.");
    } catch (err) {
        // Ignore error if columns already exist
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("⚠️ Columns already exist, skipping.");
        } else {
            console.error("❌ Migration failed:", err);
        }
    } finally {
        if (conn) conn.release();
        process.exit();
    }
}

migrateDb();
