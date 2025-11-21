# 🎉 Calzone Pay - Complete B2B/B2C Payment Platform

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://github.com)
[![Backend](https://img.shields.io/badge/Backend-100%25-brightgreen)](https://github.com)
[![Frontend](https://img.shields.io/badge/Frontend-80%25-green)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com)

> A comprehensive payment and recharge platform with B2B partner program, live API integrations, and beautiful modern UI.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd Calzone_Pay/newnew-main
```

**2. Setup Database**
```bash
cd server
node setup-database.js
```

**3. Install Dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

**4. Start Servers**
```bash
# Start both servers
cd server
node start-all.js
```

**5. Access Application**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (USER, PARTNER, EMPLOYEE, ADMIN)
- Secure password hashing
- KYC verification system

### 💰 Recharge Services
- **Mobile Recharge** - Prepaid & Postpaid (Live AllBills API)
- **DTH Recharge** - All major operators (Live AllBills API)
- **FASTag** - Highway toll recharge
- **LPG Booking** - Gas cylinder booking

### 💳 Bill Payments
- Electricity, Water, Gas, Broadband Bills
- Insurance Payments
- Education Fees
- Municipal Tax

### 🏢 B2B Partner Program
- Partner registration & KYC
- Multi-level commission system
- Customer management
- Earnings tracking
- Withdrawal management

### 💼 Wallet System
- Digital wallet with balance
- Wallet-to-wallet transfers
- Wallet-to-bank transfers
- Transaction history

### 🎫 Support System
- Ticket creation & management
- Priority levels
- Admin assignment

### 🔔 Notifications
- Real-time notifications
- Unread count badge

---

## 📚 Documentation

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Quick overview
2. **[COMPLETE.md](COMPLETE.md)** - Completion summary
3. **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)** - API documentation
4. **[FULL_ANALYSIS.md](FULL_ANALYSIS.md)** - Comprehensive analysis

---

## 📊 Project Stats

- **API Endpoints**: 50+
- **Database Tables**: 16
- **Lines of Code**: 6000+
- **Documentation Pages**: 6

---

**Status**: 🚀 Production Ready | **Version**: 1.0.0

*Last Updated: November 20, 2025*
