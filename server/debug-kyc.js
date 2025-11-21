import pool from "./db.js";

async function debugKyc() {
    try {
        const conn = await pool.getConnection();

        console.log("--- Users with PENDING status ---");
        const [users] = await conn.execute("SELECT id, name, email, kyc_status FROM users WHERE kyc_status = 'PENDING'");
        console.table(users);

        console.log("\n--- KYC Table Records ---");
        const [kycRecords] = await conn.execute("SELECT id, user_id, aadhaar_file_meta FROM kyc");
        console.log(JSON.stringify(kycRecords, null, 2));

        console.log("\n--- JOIN Query Test ---");
        const [joinResult] = await conn.execute(`
      SELECT 
        u.id, u.name, k.aadhaar_file_meta
      FROM users u
      JOIN kyc k ON u.id = k.user_id
      WHERE u.kyc_status = 'PENDING'
    `);
        console.log(JSON.stringify(joinResult, null, 2));

        conn.release();
    } catch (err) {
        console.error("Error:", err);
    }
}

debugKyc();
