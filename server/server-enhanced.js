// server.js - Enhanced Recharge Server with Auth, KYC, Admin, Razorpay
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize App
const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// --- Middleware ---
// Allow requests from the frontend development server
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Database Pool ---
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'recharge_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --- Razorpay Instance ---
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_v9bZpQvmrVnUzZ',
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Make sure to add this to your .env file
});

// --- API Credentials for allbills.in ---
const API_CUSTOMER_ID = process.env.API_CUSTOMER_ID || '3176029605';
const API_TOKEN = process.env.API_TOKEN || '6FGuGViLkD0f4Y2UppBonx00l';

// --- Helper: Safe Fetch ---
// Uses built-in fetch (Node 18+) or assumes node-fetch is available
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[External API Error] Status: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('[Fetch Error]:', err.message);
    return null;
  }
}

// --- Operator Category Mapping (Updated IDs) ---
const operatorCategoryMap = {
  // Prepaid Mobile (IDs based on your requirements)
  'Airtel': { category: 'prepaid', id: 1 },
  'Vi': { category: 'prepaid', id: 2 },
  'Jio': { category: 'prepaid', id: 4 },
  'BSNL': { category: 'prepaid', id: 8 },

  // DTH (Direct to Home)
  'DishTV': { category: 'dth', id: 31 },
  'TATASky': { category: 'dth', id: 32 },
  'SunDirect': { category: 'dth', id: 33 },
  'VideoconD2HTV': { category: 'dth', id: 34 },
  'AirtelDigitalTV': { category: 'dth', id: 36 },

  // Postpaid Mobile
  'Airtel Postpaid': { category: 'postpaid', id: 11 },
  'Vi Postpaid': { category: 'postpaid', id: 12 },
  'Jio Postpaid': { category: 'postpaid', id: 14 },
  'BSNL Postpaid': { category: 'postpaid', id: 18 },
};

// --- JWT Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ========== AUTH ENDPOINTS ==========

// 📝 Signup
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, name: legacyName, email, phone, password } = req.body;
  const name = legacyName || `${firstName} ${lastName}`;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const conn = await pool.getConnection();

    // Check if user exists
    const [rows] = await conn.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      conn.release();
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with PENDING status
    await conn.execute(
      'INSERT INTO users (name, email, phone, password, kyc_status) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, hashedPassword, 'PENDING']
    );

    conn.release();
    res.status(201).json({ message: 'Signup successful. Please complete KYC.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// 🔑 Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// 👤 Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(
      'SELECT id, name, email, phone, role, kyc_status FROM users WHERE id = ?',
      [req.user.userId]
    );
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      kyc_status: user.kyc_status,
      is_active: user.kyc_status === 'APPROVED',
    });
  } catch (err) {
    console.error('Auth/me error:', err);
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
});

// ========== KYC ENDPOINTS ==========

// 📤 Submit KYC
app.post('/api/kyc/submit', authenticateToken, async (req, res) => {
  const { aadhaar, pan, address } = req.body;
  const userId = req.user.userId;

  if (!aadhaar || !pan || !address) {
    return res.status(400).json({ message: 'All KYC fields required' });
  }

  try {
    const conn = await pool.getConnection();

    // Check if KYC already exists
    const [existing] = await conn.execute('SELECT id FROM kyc WHERE user_id = ?', [userId]);

    if (existing.length > 0) {
      // Update existing KYC
      await conn.execute(
        'UPDATE kyc SET aadhaar = ?, pan = ?, address = ?, status = ? WHERE user_id = ?',
        [aadhaar, pan, address, 'PENDING', userId]
      );
    } else {
      // Create new KYC
      await conn.execute(
        'INSERT INTO kyc (user_id, aadhaar, pan, address, status) VALUES (?, ?, ?, ?, ?)',
        [userId, aadhaar, pan, address, 'PENDING']
      );
    }

    // Update user kyc_status
    await conn.execute('UPDATE users SET kyc_status = ? WHERE id = ?', ['PENDING', userId]);

    conn.release();
    res.json({ message: 'KYC submitted successfully. Awaiting admin approval.' });
  } catch (err) {
    console.error('KYC submit error:', err);
    res.status(500).json({ message: 'KYC submission failed', error: err.message });
  }
});

// ℹ️ Get KYC Status
app.get('/api/kyc/status', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(
      'SELECT kyc_status FROM users WHERE id = ?',
      [req.user.userId]
    );
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ kyc_status: rows[0].kyc_status || 'NOT_UPLOADED' });

  } catch (err) {
    console.error('Get KYC status error:', err);
    res.status(500).json({ message: 'Failed to fetch KYC status', error: err.message });
  }
});

// ✅ Get pending KYC users (Admin only)
app.get('/api/admin/kyc-pending', authenticateToken, async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(`
      SELECT u.id, u.name, u.email, u.phone, u.kyc_status, k.aadhaar, k.pan, k.address
      FROM users u
      LEFT JOIN kyc k ON u.id = k.user_id
      WHERE u.kyc_status = 'PENDING'
    `);
    conn.release();

    res.json(rows);
  } catch (err) {
    console.error('Get pending KYC error:', err);
    res.status(500).json({ message: 'Failed to fetch pending KYC', error: err.message });
  }
});

// ✅ Approve/Reject KYC (Admin only)
app.post('/api/admin/kyc-approve', authenticateToken, async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const { userId, action } = req.body; // action: 'APPROVED' or 'REJECTED'

  if (!userId || !['APPROVED', 'REJECTED'].includes(action)) {
    return res.status(400).json({ message: 'userId and valid action required' });
  }

  try {
    const conn = await pool.getConnection();
    await conn.execute('UPDATE users SET kyc_status = ? WHERE id = ?', [action, userId]);
    await conn.execute('UPDATE kyc SET status = ? WHERE user_id = ?', [action, userId]);
    conn.release();

    res.json({ message: `User KYC ${action.toLowerCase()}ed successfully` });
  } catch (err) {
    console.error('KYC approval error:', err);
    res.status(500).json({ message: 'KYC approval failed', error: err.message });
  }
});

// ========== PAYMENT ENDPOINTS ==========

// 💳 Create Razorpay Order
app.post('/api/payment/razorpay-order', authenticateToken, async (req, res) => {
  const { amount, mobile_number, operator } = req.body;

  if (!amount || !mobile_number || !operator) {
    return res.status(400).json({ message: 'amount, mobile_number, operator required' });
  }

  try {
    const options = {
      amount: amount, // amount is already in paise from the frontend
      currency: "INR",
      receipt: `recharge_${req.user.userId}_${Date.now()}`,
      notes: {
        userId: req.user.userId,
        mobile_number: mobile_number,
        operator: operator,
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
});

// ✅ Verify Payment & Save Transaction
app.post('/api/payment/verify', authenticateToken, async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    mobile_number,
    operator,
    operator_code,
    amount,
    plan_amount
  } = req.body;
  const userId = req.user.userId;

  if (!razorpay_payment_id || !mobile_number || !operator || !amount || !operator_code) {
    return res.status(400).json({ message: 'All payment details required' });
  }

  try {
    // --- SAFEGUARD ADDED ---
    // This prevents the server from crashing if razorpay_order_id is missing.
    // We will generate a unique order number based on the payment ID instead.
    const orderNo = razorpay_payment_id 
      ? razorpay_payment_id.slice(-10) 
      : `fallback_${Date.now()}`;
    const rechargeApiUrl = `https://api.allbills.in/billpay/paynow?customer_id=${API_CUSTOMER_ID}&token=${API_TOKEN}&operator=${operator_code}&amount=${plan_amount}&mobile=${mobile_number}&orderno=${orderNo}`;

    console.log(`Calling Recharge API: ${rechargeApiUrl}`);
    const rechargeApiResponse = await fetch(rechargeApiUrl);

    let rechargeApiBody;
    try {
      rechargeApiBody = await rechargeApiResponse.json();
    } catch (e) {
      rechargeApiBody = await rechargeApiResponse.text();
    }

    const rechargeCallResult = {
      ok: rechargeApiResponse.ok,
      status: rechargeApiResponse.status,
      body: rechargeApiBody,
    };

    console.log('Recharge API Response:', rechargeCallResult);

    const transactionStatus = rechargeApiResponse.ok && (rechargeApiBody.status === 'success' || rechargeApiBody.status === 'SUCCESS') ? 'SUCCESS' : 'FAILED';

    const conn = await pool.getConnection();
    await conn.execute(
      'INSERT INTO transactions (user_id, mobile_number, operator, amount, razorpay_payment_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, mobile_number, operator, amount, razorpay_payment_id, transactionStatus]
    );
    conn.release();

    res.json({
      message: 'Payment verification processed.',
      recharge_call: rechargeCallResult
    });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ message: 'Payment verification failed', error: err.message });
  }
});

// 💰 Calculate Fees
app.post('/api/payment/calculate-fees', authenticateToken, (req, res) => {
  const { amount } = req.body;
  const planAmount = Number(amount);

  if (!planAmount || planAmount <= 0) {
    return res.status(400).json({ message: 'A valid amount is required.' });
  }

  // --- Commission Logic ---
  // This is where you define your business rules for fees.
  // You can make this as complex as needed, e.g., fetch rates from a database.
  // For now, we'll use fixed percentages as an example.

  const agentCommission = planAmount * 0.01;   // 1% for the agent
  const companyCommission = planAmount * 0.015; // 1.5% for the company
  const apiCommission = planAmount * 0.005;     // 0.5% for the API provider/gateway fee

  const totalFees = agentCommission + companyCommission + apiCommission;
  const totalAmount = planAmount + totalFees;

  res.json({
    planAmount: planAmount,
    agentCommission: agentCommission,
    companyCommission: companyCommission,
    apiCommission: apiCommission,
    totalAmount: totalAmount,
  });
});

// 📜 Get All Transactions (Paginated)
app.get('/api/payment/transactions', authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const userId = req.user.userId;

  try {
    const conn = await pool.getConnection();

    // Get total count for pagination
    const [countRows] = await conn.execute(
      'SELECT COUNT(*) as total FROM transactions WHERE user_id = ?',
      [userId]
    );
    
    // --- SAFEGUARD ADDED ---
    // Safely get the total count, defaulting to 0 if no rows are returned.
    const totalTransactions = countRows[0] ? countRows[0].total : 0;
    const totalPages = Math.ceil(totalTransactions / limit);

    // Get paginated transactions
    const [transactions] = await conn.execute(
      `SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      [userId]
    );

    conn.release();

    res.json({
      transactions,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalTransactions: totalTransactions,
      },
    });

  } catch (err) {
    console.error('Fetch transactions error:', err);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: err.message
    });
  }
});


// ========== RECHARGE PLANS ENDPOINTS ==========

// 🔎 Fetch Operator (HLR Lookup) - FIXED for 502 Error
// Returns null/safe response to force manual selection on Frontend
app.get('/api/operator/:mobileNumber', async (req, res) => {
  const { mobileNumber } = req.params;

  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: 'Invalid mobile number' });
  }

  // Note: Since we do not have a dedicated HLR Lookup API, 
  // we return a generic success response but with null data.
  // This stops the 502 error and allows the Frontend to simply
  // show the dropdowns for the user to select Operator manually.

  res.json({
    found: false,
    message: "Auto-detection unavailable, please select operator manually."
  });
});

// ✅ Get All Operators
// Returns { name, category, id } so frontend knows which form to show
app.get('/api/operators', (req, res) => {
  console.log("Fetching operators...");

  const operatorList = Object.entries(operatorCategoryMap).map(([name, details]) => ({
    name,
    category: details.category,
    id: String(details.id),
    operatorCode: details.id,
  }));

  res.json(operatorList);
});

// ✅ Fetch DTH Plans (UPDATED URL)
app.get('/api/dth-plans/:operatorCode', async (req, res) => {
  const { operatorCode } = req.params;

  if (!operatorCode) {
    return res.status(400).json({ error: 'Operator code is required' });
  }

  // EXACT URL provided
  const dthPlansApiUrl = `https://api.allbills.in/operatorapi/dthplan?customer_id=${API_CUSTOMER_ID}&token=${API_TOKEN}&operator=${operatorCode}`;

  console.log(`[Backend] Fetching DTH plans: ${dthPlansApiUrl}`);

  const data = await safeFetch(dthPlansApiUrl);

  // Handle External API Failure Gracefully
  if (!data) {
    console.error("[Backend] DTH API returned null/failed");
    return res.json({ error: 'Service provider unavailable. Please enter amount manually.' });
  }

  // Forward valid data
  if (typeof data === 'object' && !data.error) {
    res.json(data);
  } else {
    res.json({ error: data.message || 'No DTH plans found' });
  }
});

// ✅ Mobile Fetch Plans (UPDATED URL)
app.get('/api/plans/:operatorCode/:circleCode', async (req, res) => {
  const { operatorCode, circleCode } = req.params;

  // EXACT URL provided
  const plansApiUrl = `https://api.allbills.in/operatorapi/prepaid?customer_id=${API_CUSTOMER_ID}&token=${API_TOKEN}&circle=${circleCode}&operator=${operatorCode}`;

  console.log(`[Backend] Fetching Mobile plans from: ${plansApiUrl}`);

  const data = await safeFetch(plansApiUrl);

  if (!data) {
    console.error("[Backend] Mobile Plan Fetch returned null.");
    return res.json({ error: 'Service unavailable for this operator.' });
  }

  if (typeof data === 'object' && !data.error) {
    res.json(data);
  } else {
    res.json({ error: data.message || 'No plans found' });
  }
});

// ✅ Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Recharge API Server running ✅', port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});