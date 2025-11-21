-- Quick setup script for essential tables
-- Run this manually in MySQL Workbench or phpMyAdmin

USE recharge_db;

-- Add PARTNER role to users
ALTER TABLE users MODIFY COLUMN role ENUM('USER','ADMIN','EMPLOYEE','PARTNER') DEFAULT 'USER';
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE AFTER kyc_status;

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
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
) ENGINE=InnoDB;

-- Partner customers
CREATE TABLE IF NOT EXISTS partner_customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partner_id INT NOT NULL,
  customer_id INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_partner_customer (partner_id, customer_id)
) ENGINE=InnoDB;

-- Wallets
CREATE TABLE IF NOT EXISTS wallets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  balance DECIMAL(12,2) DEFAULT 0.00,
  locked_balance DECIMAL(12,2) DEFAULT 0.00,
  total_credited DECIMAL(15,2) DEFAULT 0.00,
  total_debited DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Wallet transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
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
) ENGINE=InnoDB;

-- Commission settings
CREATE TABLE IF NOT EXISTS commission_settings (
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
) ENGINE=InnoDB;

-- Commissions
CREATE TABLE IF NOT EXISTS commissions (
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
) ENGINE=InnoDB;

-- Withdrawals
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
  transaction_ref VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Money transfers
CREATE TABLE IF NOT EXISTS money_transfers (
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
) ENGINE=InnoDB;

-- Insert commission settings
INSERT INTO commission_settings (service_type, service_category, b2c_commission_rate, b2b_partner_rate, b2b_platform_rate) VALUES
('recharge', 'mobile_prepaid', 2.00, 3.00, 1.50),
('recharge', 'mobile_postpaid', 1.50, 2.50, 1.00),
('recharge', 'dth', 2.00, 3.00, 1.50)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

SELECT 'Essential tables created successfully!' AS status;
