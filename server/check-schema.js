import pool from "./db.js";

async function checkSchema() {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute("DESCRIBE kyc");
        console.table(rows);
        conn.release();
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

checkSchema();
