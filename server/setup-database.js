import mysql from 'mysql2/promise';

async function setupDatabase() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'recharge_db'
        });

        console.log('🚀 Starting database setup...\n');

        // Update users table
        console.log('1. Updating users table...');
        try {
            await connection.query(`ALTER TABLE users MODIFY COLUMN role ENUM('USER','ADMIN','EMPLOYEE','PARTNER') DEFAULT 'USER'`);
            console.log('   ✓ PARTNER role added');
        } catch (e) {
            console.log('   ⚠ Role already updated');
        }

        try {
            await connection.query(`ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER kyc_status`);
            console.log('   ✓ is_active column added');
        } catch (e) {
            console.log('   ⚠ is_active already exists');
        }

        // Create tables one by one
        console.log('\n2. Creating partners table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS partners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNIQUE NOT NULL,
      business_name VARCHAR(255) NOT NULL,
      business_type VARCHAR(100),
      pan_number VARCHAR(20),
      gst_number VARCHAR(30),
      commission_rate DECIMAL(5,2) DEFAULT 3.00,
      status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
      kyc_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
        console.log('   ✓ partners created');

        console.log('\n3. Creating partner_customers table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS partner_customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      partner_id INT NOT NULL,
      customer_id INT NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE,
      FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_partner_customer (partner_id, customer_id)
    )`);
        console.log('   ✓ partner_customers created');

        console.log('\n4. Creating wallets table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS wallets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNIQUE NOT NULL,
      balance DECIMAL(12,2) DEFAULT 0.00,
      locked_balance DECIMAL(12,2) DEFAULT 0.00,
      total_credited DECIMAL(15,2) DEFAULT 0.00,
      total_debited DECIMAL(15,2) DEFAULT 0.00,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
        console.log('   ✓ wallets created');

        console.log('\n5. Creating wallet_transactions table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS wallet_transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      wallet_id INT NOT NULL,
      transaction_type ENUM('CREDIT', 'DEBIT') NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      balance_before DECIMAL(12,2) NOT NULL,
      balance_after DECIMAL(12,2) NOT NULL,
      reference_type VARCHAR(50),
      reference_id INT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
    )`);
        console.log('   ✓ wallet_transactions created');

        console.log('\n6. Creating commission_settings table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS commission_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_type VARCHAR(50) NOT NULL,
      service_category VARCHAR(50),
      b2c_commission_rate DECIMAL(5,2) DEFAULT 2.00,
      b2b_partner_rate DECIMAL(5,2) DEFAULT 3.00,
      b2b_platform_rate DECIMAL(5,2) DEFAULT 1.50,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_service (service_type, service_category)
    )`);
        console.log('   ✓ commission_settings created');

        console.log('\n7. Creating commissions table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS commissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      transaction_id INT NOT NULL,
      partner_id INT NULL,
      commission_type ENUM('B2B_PARTNER', 'B2C_PLATFORM', 'B2B_PLATFORM') NOT NULL,
      base_amount DECIMAL(10,2) NOT NULL,
      commission_rate DECIMAL(5,2) NOT NULL,
      commission_amount DECIMAL(10,2) NOT NULL,
      status ENUM('PENDING', 'CREDITED', 'FAILED') DEFAULT 'PENDING',
      credited_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
      FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL
    )`);
        console.log('   ✓ commissions created');

        console.log('\n8. Creating withdrawals table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS withdrawals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      bank_account_number VARCHAR(50),
      ifsc_code VARCHAR(20),
      account_holder_name VARCHAR(255),
      upi_id VARCHAR(100),
      withdrawal_mode ENUM('BANK_TRANSFER', 'UPI') DEFAULT 'BANK_TRANSFER',
      status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
      admin_notes TEXT,
      processed_by INT,
      processed_at TIMESTAMP NULL,
      transaction_ref VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL
    )`);
        console.log('   ✓ withdrawals created');

        console.log('\n9. Creating bill_payments table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS bill_payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      partner_id INT NULL,
      bill_type ENUM('ELECTRICITY', 'WATER', 'GAS', 'BROADBAND', 'LANDLINE', 'DTH') NOT NULL,
      provider VARCHAR(100) NOT NULL,
      consumer_number VARCHAR(100) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      convenience_fee DECIMAL(10,2) DEFAULT 0.00,
      total_amount DECIMAL(10,2) NOT NULL,
      status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
      payment_id VARCHAR(200),
      payment_mode ENUM('WALLET', 'RAZORPAY', 'UPI') DEFAULT 'RAZORPAY',
      response_data JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL
    )`);
        console.log('   ✓ bill_payments created');

        console.log('\n10. Creating money_transfers table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS money_transfers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      from_user_id INT NOT NULL,
      to_user_id INT NULL,
      transfer_type ENUM('WALLET_TO_WALLET', 'WALLET_TO_BANK') NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      transfer_fee DECIMAL(10,2) DEFAULT 0.00,
      total_amount DECIMAL(12,2) NOT NULL,
      bank_account_number VARCHAR(50),
      ifsc_code VARCHAR(20),
      account_holder_name VARCHAR(255),
      upi_id VARCHAR(100),
      status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
      transaction_ref VARCHAR(100),
      failure_reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE SET NULL
    )`);
        console.log('   ✓ money_transfers created');

        console.log('\n11. Creating support_tickets table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS support_tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      ticket_number VARCHAR(20) UNIQUE NOT NULL,
      subject VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100),
      priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
      status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
      assigned_to INT,
      resolved_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
    )`);
        console.log('   ✓ support_tickets created');

        console.log('\n12. Creating support_ticket_replies table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS support_ticket_replies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ticket_id INT NOT NULL,
      user_id INT NOT NULL,
      message TEXT NOT NULL,
      is_staff_reply BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
        console.log('   ✓ support_ticket_replies created');

        console.log('\n13. Creating notifications table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      type VARCHAR(50),
      is_read BOOLEAN DEFAULT FALSE,
      action_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
        console.log('   ✓ notifications created');

        console.log('\n14. Creating travel_bookings table...');
        await connection.query(`CREATE TABLE IF NOT EXISTS travel_bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      partner_id INT NULL,
      booking_type ENUM('BUS', 'TRAIN', 'FLIGHT', 'HOTEL', 'CAB') NOT NULL,
      from_location VARCHAR(255),
      to_location VARCHAR(255),
      journey_date DATE,
      return_date DATE,
      passenger_details JSON,
      amount DECIMAL(10,2) NOT NULL,
      convenience_fee DECIMAL(10,2) DEFAULT 0.00,
      total_amount DECIMAL(10,2) NOT NULL,
      booking_status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'FAILED') DEFAULT 'PENDING',
      pnr VARCHAR(50),
      ticket_data JSON,
      payment_mode ENUM('WALLET', 'RAZORPAY', 'UPI') DEFAULT 'RAZORPAY',
      payment_id VARCHAR(200),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL
    )`);
        console.log('   ✓ travel_bookings created');

        // Insert commission settings
        console.log('\n15. Inserting commission settings...');
        await connection.query(`
      INSERT INTO commission_settings (service_type, service_category, b2c_commission_rate, b2b_partner_rate, b2b_platform_rate) VALUES
      ('recharge', 'mobile_prepaid', 2.00, 3.00, 1.50),
      ('recharge', 'mobile_postpaid', 1.50, 2.50, 1.00),
      ('recharge', 'dth', 2.00, 3.00, 1.50),
      ('bill_payment', 'electricity', 1.00, 2.00, 0.80),
      ('bill_payment', 'water', 1.00, 2.00, 0.80),
      ('bill_payment', 'gas', 1.00, 2.00, 0.80),
      ('bill_payment', 'broadband', 1.50, 2.50, 1.00),
      ('travel', 'bus', 2.50, 4.00, 2.00),
      ('travel', 'train', 2.00, 3.50, 1.50),
      ('travel', 'flight', 3.00, 5.00, 2.50),
      ('travel', 'hotel', 3.50, 5.50, 3.00),
      ('money_transfer', 'wallet_to_wallet', 0.50, 1.00, 0.30),
      ('money_transfer', 'wallet_to_bank', 1.00, 1.50, 0.80)
      ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP
    `);
        console.log('   ✓ Commission settings inserted');

        // Verify
        const [tables] = await connection.query('SHOW TABLES');
        const [settings] = await connection.query('SELECT COUNT(*) as count FROM commission_settings');

        console.log('\n✅ DATABASE SETUP COMPLETE!');
        console.log(`   Total tables: ${tables.length}`);
        console.log(`   Commission settings: ${settings[0].count}`);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

setupDatabase();
