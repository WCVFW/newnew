import mysql from 'mysql2/promise';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runFullSchema() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'recharge_db'
    });

    try {
        console.log('📊 Starting full platform schema migration...\\n');

        // Step 1: Update users table
        console.log('1️⃣  Updating users table...');
        try {
            await connection.query(`ALTER TABLE users MODIFY COLUMN role ENUM('USER','ADMIN','EMPLOYEE','PARTNER') DEFAULT 'USER'`);
            console.log('   ✓ Added PARTNER role');
        } catch (err) {
            if (!err.message.includes('Duplicate')) console.log('   ⚠ Role already updated');
        }

        try {
            await connection.query(`ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER kyc_status`);
            console.log('   ✓ Added is_active column');
        } catch (err) {
            if (err.message.includes('Duplicate column')) console.log('   ⚠ is_active already exists');
            else throw err;
        }

        // Step 2: Read and execute main schema
        console.log('\\n2️⃣  Creating new tables...');
        const schemaPath = join(__dirname, 'schema-full-platform.sql');
        let schema = await readFile(schemaPath, 'utf8');

        // Remove the ALTER TABLE statements (already done above)
        schema = schema.replace(/ALTER TABLE[\\s\\S]*?;/g, '');
        // Remove USE statement
        schema = schema.replace(/USE recharge_db;/g, '');

        await connection.query(schema);
        console.log('   ✓ All tables created');

        // Step 3: Verify
        console.log('\\n3️⃣  Verifying installation...');
        const [tables] = await connection.query('SHOW TABLES');
        console.log(`   ✓ Total tables: ${tables.length}`);

        const [settings] = await connection.query('SELECT COUNT(*) as count FROM commission_settings');
        console.log(`   ✓ Commission settings: ${settings[0].count} entries`);

        console.log('\\n✅ Full platform schema ready!');
        console.log('\\n📋 New tables created:');
        const newTables = ['partners', 'partner_customers', 'wallets', 'wallet_transactions',
            'commission_settings', 'commissions', 'withdrawals', 'bill_payments',
            'travel_bookings', 'support_tickets', 'support_ticket_replies',
            'notifications', 'money_transfers'];
        newTables.forEach(t => console.log(`   • ${t}`));

    } catch (error) {
        console.error('\\n❌ Error Details:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('SQL State:', error.sqlState);
        if (error.sql) console.error('SQL:', error.sql.substring(0, 200));
        throw error;
    } finally {
        await connection.end();
    }
}

runFullSchema()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('\\n💥 Migration failed - see details above');
        process.exit(1);
    });
