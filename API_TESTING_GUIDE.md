# API Testing Guide

## Quick Start

### 1. Setup Database
Run this SQL file in MySQL Workbench:
```sql
-- File: server/quick-setup.sql
```

### 2. Start Server
```bash
cd server
node start-all.js
```

Server will run on: `http://localhost:3000`

---

## Authentication

### Register User
```http
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

### Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response**: Save the `token` from response for authenticated requests.

---

## Partner APIs

### Register as Partner
```http
POST http://localhost:3000/api/partner/register
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "business_name": "My Business",
  "business_type": "Retailer",
  "pan_number": "ABCDE1234F",
  "gst_number": "12ABCDE1234F1Z5"
}
```

### Get Partner Profile
```http
GET http://localhost:3000/api/partner/profile
Authorization: Bearer <your_token>
```

### Get Partner Earnings
```http
GET http://localhost:3000/api/partner/earnings
Authorization: Bearer <your_token>
```

### Add Customer to Partner
```http
POST http://localhost:3000/api/partner/customers
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "customer_email": "customer@example.com"
}
```

---

## Recharge APIs (AllBills Integration)

### Get Operators
```http
GET http://localhost:3000/api/recharge/operators
```

### Get Mobile Plans
```http
GET http://localhost:3000/api/recharge/mobile/plans?circle=5&operator=1
```

### Get DTH Plans
```http
GET http://localhost:3000/api/recharge/dth/plans?operator=31
```

### Mobile Recharge
```http
POST http://localhost:3000/api/recharge/mobile
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "mobile_number": "9876543210",
  "operator": 1,
  "circle": 5,
  "amount": 99,
  "payment_mode": "RAZORPAY"
}
```

### DTH Recharge
```http
POST http://localhost:3000/api/recharge/dth
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "customer_id": "1234567890",
  "operator": 31,
  "amount": 299,
  "payment_mode": "RAZORPAY"
}
```

### Get Recharge History
```http
GET http://localhost:3000/api/recharge/history?page=1&limit=20
Authorization: Bearer <your_token>
```

---

## Wallet APIs

### Get Wallet Balance
```http
GET http://localhost:3000/api/wallet/balance
Authorization: Bearer <your_token>
```

### Get Wallet Transactions
```http
GET http://localhost:3000/api/wallet/transactions?page=1&limit=20
Authorization: Bearer <your_token>
```

### Add Money to Wallet
```http
POST http://localhost:3000/api/wallet/add-money
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "amount": 1000,
  "payment_id": "pay_123456",
  "order_id": "order_123456"
}
```

### Wallet to Wallet Transfer
```http
POST http://localhost:3000/api/wallet/transfer
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "to_email": "recipient@example.com",
  "amount": 500
}
```

### Request Bank Transfer
```http
POST http://localhost:3000/api/wallet/bank-transfer
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "amount": 1000,
  "bank_account_number": "1234567890",
  "ifsc_code": "SBIN0001234",
  "account_holder_name": "John Doe"
}
```

---

## Bill Payment APIs

### Get Bill Providers
```http
GET http://localhost:3000/api/bills/providers/electricity
```

Available types: `electricity`, `water`, `gas`, `broadband`

### Pay Bill
```http
POST http://localhost:3000/api/bills/pay
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "bill_type": "ELECTRICITY",
  "provider": "MSEDCL",
  "consumer_number": "123456789",
  "amount": 1500,
  "payment_mode": "RAZORPAY"
}
```

### Get Bill Payment History
```http
GET http://localhost:3000/api/bills/history?page=1&limit=20
Authorization: Bearer <your_token>
```

---

## Support Ticket APIs

### Create Support Ticket
```http
POST http://localhost:3000/api/support/ticket
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "subject": "Issue with recharge",
  "description": "My recharge failed but amount was deducted",
  "category": "recharge",
  "priority": "HIGH"
}
```

### Get All Tickets
```http
GET http://localhost:3000/api/support/tickets?page=1&limit=20
Authorization: Bearer <your_token>
```

### Get Ticket Details
```http
GET http://localhost:3000/api/support/ticket/1
Authorization: Bearer <your_token>
```

### Reply to Ticket
```http
POST http://localhost:3000/api/support/ticket/1/reply
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "message": "I have checked my bank statement and the amount was deducted"
}
```

### Close Ticket
```http
PUT http://localhost:3000/api/support/ticket/1/close
Authorization: Bearer <your_token>
```

---

## Notification APIs

### Get Notifications
```http
GET http://localhost:3000/api/notifications?page=1&limit=20
Authorization: Bearer <your_token>
```

### Mark Notification as Read
```http
PUT http://localhost:3000/api/notifications/1/read
Authorization: Bearer <your_token>
```

### Mark All as Read
```http
PUT http://localhost:3000/api/notifications/read-all
Authorization: Bearer <your_token>
```

### Delete Notification
```http
DELETE http://localhost:3000/api/notifications/1
Authorization: Bearer <your_token>
```

---

## Admin APIs

**Note**: Requires admin role. Login with admin credentials.

### Get Partners List
```http
GET http://localhost:3000/api/admin/partners
Authorization: Bearer <admin_token>
```

### Approve Partner
```http
PUT http://localhost:3000/api/admin/partner/1/approve
Authorization: Bearer <admin_token>
```

### Reject Partner
```http
PUT http://localhost:3000/api/admin/partner/1/reject
Authorization: Bearer <admin_token>
```

### Set Partner Commission
```http
PUT http://localhost:3000/api/admin/partner/1/commission
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "commission_rate": 3.5
}
```

### Get Withdrawal Requests
```http
GET http://localhost:3000/api/admin/withdrawals
Authorization: Bearer <admin_token>
```

### Approve Withdrawal
```http
PUT http://localhost:3000/api/admin/withdrawal/1/approve
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "transaction_ref": "TXN123456789"
}
```

### Reject Withdrawal
```http
PUT http://localhost:3000/api/admin/withdrawal/1/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "admin_notes": "Insufficient documentation"
}
```

### Get Support Tickets
```http
GET http://localhost:3000/api/admin/support-tickets
Authorization: Bearer <admin_token>
```

### Assign Ticket
```http
PUT http://localhost:3000/api/admin/support-ticket/1/assign
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "assigned_to": 2
}
```

---

## Testing with Postman

1. Import this file as a collection
2. Create environment variable: `token`
3. After login, set `token` variable with the response token
4. All authenticated requests will use `{{token}}`

---

## AllBills API Details

### Credentials
- **Customer ID**: 3176029605
- **Token**: 6FGuGViLkD0f4Y2UppBonx00l
- **Base URL**: https://api.allbills.in

### Operator IDs
**Mobile:**
- 1: Airtel
- 2: Jio
- 3: Vi (Vodafone Idea)
- 4: BSNL

**DTH:**
- 31: Tata Sky
- 32: Airtel Digital TV
- 33: Dish TV

### Circle IDs
- 1: Andhra Pradesh
- 5: Delhi
- 10: Karnataka
- 13: Maharashtra
- 14: Mumbai

---

## Expected Responses

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

### Commission Flow
When a recharge is successful:
1. Transaction is created
2. Commission is calculated based on service type
3. If user is under a partner:
   - Partner commission is credited to partner wallet
   - Platform commission is recorded
4. If direct B2C:
   - Platform gets full commission

---

## Database Queries for Testing

### Check Wallet Balance
```sql
SELECT * FROM wallets WHERE user_id = 1;
```

### Check Commissions
```sql
SELECT * FROM commissions WHERE partner_id = 1;
```

### Check Transactions
```sql
SELECT * FROM transactions WHERE user_id = 1 ORDER BY created_at DESC;
```

### Check Partner Customers
```sql
SELECT * FROM partner_customers WHERE partner_id = 1;
```

---

## Troubleshooting

### Issue: "Table doesn't exist"
**Solution**: Run `server/quick-setup.sql` in MySQL

### Issue: "Unauthorized"
**Solution**: Check if token is valid and not expired

### Issue: "AllBills API error"
**Solution**: Verify AllBills credentials and internet connection

### Issue: "Insufficient balance"
**Solution**: Add money to wallet first using `/api/wallet/add-money`

---

**Happy Testing! 🚀**
