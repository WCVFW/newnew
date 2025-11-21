-- =====================================================
-- FULL PLATFORM DATABASE SCHEMA
-- B2B/B2C Recharge & Payment Platform
-- =====================================================

USE recharge_db;

-- =====================================================
-- PHASE 1: CORE ENHANCEMENTS
-- =====================================================

-- Update users table to add PARTNER role
ALTER TABLE users 
MODIFY COLUMN role ENUM('USER','ADMIN','EMPLOYEE','PARTNER') DEFAULT 'USER';

-- Add is_active column for account status
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT FALSE AFTER kyc_status;

-- =====================================================
-- PHASE 2: PARTNER SYSTEM
-- =====================================================

-- Partners table for B2B partners/agents
CREATE TABLE IF NOT EXISTS partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_type VARCHAR(100),
  pan_number VARCHAR(20),
  gst_number VARCHAR(30),
  commission_rate DECIMAL(5,2) DEFAULT 3.00 COMMENT 'Default 3% commission',
  status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
  kyc_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_kyc_status (kyc_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Partner customers relationship table
CREATE TABLE IF NOT EXISTS partner_customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partner_id INT NOT NULL,
  customer_id INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_partner_customer (partner_id, customer_id),
  INDEX idx_partner (partner_id),
  INDEX idx_customer (customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 3: WALLET SYSTEM
-- =====================================================

-- Wallets table for user balances
CREATE TABLE IF NOT EXISTS wallets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  balance DECIMAL(12,2) DEFAULT 0.00,
  locked_balance DECIMAL(12,2) DEFAULT 0.00 COMMENT 'Amount locked in pending transactions',
  total_credited DECIMAL(15,2) DEFAULT 0.00,
  total_debited DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Wallet transactions ledger
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wallet_id INT NOT NULL,
  transaction_type ENUM('CREDIT', 'DEBIT') NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  balance_before DECIMAL(12,2) NOT NULL,
  balance_after DECIMAL(12,2) NOT NULL,
  reference_type VARCHAR(50) COMMENT 'recharge, bill_payment, commission, transfer, withdrawal',
  reference_id INT COMMENT 'ID of the referenced transaction',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE,
  INDEX idx_wallet_created (wallet_id, created_at),
  INDEX idx_reference (reference_type, reference_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 4: COMMISSION SYSTEM
-- =====================================================

-- Commission settings for different services
CREATE TABLE IF NOT EXISTS commission_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_type VARCHAR(50) NOT NULL COMMENT 'recharge, bill_payment, travel, money_transfer',
  service_category VARCHAR(50) COMMENT 'mobile, dth, electricity, bus, train, etc',
  b2c_commission_rate DECIMAL(5,2) DEFAULT 2.00 COMMENT 'Platform commission for B2C',
  b2b_partner_rate DECIMAL(5,2) DEFAULT 3.00 COMMENT 'Partner commission for B2B',
  b2b_platform_rate DECIMAL(5,2) DEFAULT 1.50 COMMENT 'Platform commission from B2B',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_service (service_type, service_category),
  INDEX idx_service_type (service_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Commission records for all transactions
CREATE TABLE IF NOT EXISTS commissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_id INT NOT NULL,
  partner_id INT NULL COMMENT 'NULL for B2C transactions',
  commission_type ENUM('B2B_PARTNER', 'B2C_PLATFORM', 'B2B_PLATFORM') NOT NULL,
  base_amount DECIMAL(10,2) NOT NULL COMMENT 'Transaction amount',
  commission_rate DECIMAL(5,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status ENUM('PENDING', 'CREDITED', 'FAILED') DEFAULT 'PENDING',
  credited_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL,
  INDEX idx_partner_status (partner_id, status),
  INDEX idx_transaction (transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 5: WITHDRAWAL SYSTEM
-- =====================================================

-- Withdrawal requests
CREATE TABLE IF NOT EXISTS withdrawals (
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
  transaction_ref VARCHAR(100) COMMENT 'Bank/UPI transaction reference',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_status (user_id, status),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 6: BILL PAYMENTS
-- =====================================================

-- Bill payments table
CREATE TABLE IF NOT EXISTS bill_payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  partner_id INT NULL COMMENT 'Partner ID if transaction via partner',
  bill_type ENUM('ELECTRICITY', 'WATER', 'GAS', 'BROADBAND', 'LANDLINE', 'DTH') NOT NULL,
  provider VARCHAR(100) NOT NULL,
  consumer_number VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  convenience_fee DECIMAL(10,2) DEFAULT 0.00,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
  payment_id VARCHAR(200),
  payment_mode ENUM('WALLET', 'RAZORPAY', 'UPI') DEFAULT 'RAZORPAY',
  response_data JSON COMMENT 'API provider response',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 7: TRAVEL BOOKINGS
-- =====================================================

-- Travel bookings table
CREATE TABLE IF NOT EXISTS travel_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  partner_id INT NULL,
  booking_type ENUM('BUS', 'TRAIN', 'FLIGHT', 'HOTEL', 'CAB') NOT NULL,
  from_location VARCHAR(255),
  to_location VARCHAR(255),
  journey_date DATE,
  return_date DATE,
  passenger_details JSON COMMENT 'Array of passenger information',
  amount DECIMAL(10,2) NOT NULL,
  convenience_fee DECIMAL(10,2) DEFAULT 0.00,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'FAILED') DEFAULT 'PENDING',
  pnr VARCHAR(50),
  ticket_data JSON COMMENT 'Ticket details from provider',
  payment_mode ENUM('WALLET', 'RAZORPAY', 'UPI') DEFAULT 'RAZORPAY',
  payment_id VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_booking_type (booking_type),
  INDEX idx_status (booking_status),
  INDEX idx_journey_date (journey_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 8: SUPPORT SYSTEM
-- =====================================================

-- Support tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) COMMENT 'recharge, bill, booking, wallet, kyc, other',
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
  status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
  assigned_to INT,
  resolved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_assigned (assigned_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Support ticket replies
CREATE TABLE IF NOT EXISTS support_ticket_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT NOT NULL,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  is_staff_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_ticket (ticket_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 9: NOTIFICATIONS
-- =====================================================

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) COMMENT 'transaction, commission, kyc, support, system',
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_read (user_id, is_read),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PHASE 10: MONEY TRANSFER
-- =====================================================

-- Money transfers (wallet to wallet, wallet to bank)
CREATE TABLE IF NOT EXISTS money_transfers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT NOT NULL,
  to_user_id INT NULL COMMENT 'NULL for bank transfers',
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
  FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_from_user (from_user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SEED DATA: Default Commission Settings
-- =====================================================

INSERT INTO commission_settings (service_type, service_category, b2c_commission_rate, b2b_partner_rate, b2b_platform_rate) VALUES
-- Mobile Recharge
('recharge', 'mobile_prepaid', 2.00, 3.00, 1.50),
('recharge', 'mobile_postpaid', 1.50, 2.50, 1.00),
('recharge', 'dth', 2.00, 3.00, 1.50),
-- Bill Payments
('bill_payment', 'electricity', 1.00, 2.00, 0.80),
('bill_payment', 'water', 1.00, 2.00, 0.80),
('bill_payment', 'gas', 1.00, 2.00, 0.80),
('bill_payment', 'broadband', 1.50, 2.50, 1.00),
-- Travel
('travel', 'bus', 2.50, 4.00, 2.00),
('travel', 'train', 2.00, 3.50, 1.50),
('travel', 'flight', 3.00, 5.00, 2.50),
('travel', 'hotel', 3.50, 5.50, 3.00),
-- Money Transfer
('money_transfer', 'wallet_to_wallet', 0.50, 1.00, 0.30),
('money_transfer', 'wallet_to_bank', 1.00, 1.50, 0.80)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Show all tables
SHOW TABLES;

-- Verify new tables created
SELECT 
    'Database schema updated successfully!' AS status,
    COUNT(*) AS total_tables 
FROM information_schema.tables 
WHERE table_schema = 'recharge_db';

-- Show commission settings
SELECT * FROM commission_settings;

SELECT '✅ Full platform schema implementation complete!' AS message;
