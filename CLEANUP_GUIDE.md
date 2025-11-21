# 🧹 PRODUCTION CLEANUP & OPTIMIZATION GUIDE

## Files to Remove (Unused/Development Only)

### Server Directory - Remove These Files:

```bash
cd server

# Remove old schema migration files (use setup-database.js instead)
rm execute-schema.js
rm run-full-schema.js
rm fix-transactions-schema.js
rm add-recharge-columns.js
rm add-razorpay-payment-id.js
rm add-razorpay-column.js
rm migrate-blobs.js
rm migrate-transactions-table.js
rm check-schema.js

# Remove debug/test files
rm debug-kyc.js
rm test-api.js
rm verify-admin-user.js

# Remove duplicate/old files
rm server-enhanced.js
rm setup-db.js
rm seed-data.js
rm add-admin-user.js

# Keep only these essential files:
# - server.js (main server)
# - start-all.js (startup script)
# - setup-database.js (database setup)
# - db.js (database connection)
# - authMiddleware.js (authentication)
# - All route files (*Routes.js)
# - All service files (*Service.js)
# - All controller files (*Controller.js)
# - uploadMiddleware.js
```

---

## ✅ ESSENTIAL FILES TO KEEP

### Core Server Files
```
server/
├── server.js                 ✅ Main server file
├── start-all.js             ✅ Startup script
├── setup-database.js        ✅ Database setup
├── db.js                    ✅ Database connection
├── .env                     ✅ Environment variables
└── package.json             ✅ Dependencies
```

### Middleware Files
```
server/
├── authMiddleware.js        ✅ JWT authentication
└── uploadMiddleware.js      ✅ File upload handling
```

### Route Files (API Endpoints)
```
server/
├── authRoutes.js           ✅ Authentication endpoints
├── kycRoutes.js            ✅ KYC verification
├── adminRoutes.js          ✅ Admin management
├── partnerRoutes.js        ✅ Partner system
├── rechargeRoutes.js       ✅ Recharge APIs
├── walletRoutes.js         ✅ Wallet management
├── billRoutes.js           ✅ Bill payments
├── supportRoutes.js        ✅ Support tickets
├── notificationRoutes.js   ✅ Notifications
├── paymentRoutes.js        ✅ Payment processing
└── operatorRoutes.js       ✅ Operator data
```

### Service Files
```
server/
├── allBillsService.js      ✅ AllBills API integration
└── emailService.js         ✅ Email notifications
```

### Controller Files
```
server/
└── kycController.js        ✅ KYC business logic
```

### SQL Files
```
server/
├── schema.sql              ✅ Original schema
├── schema-full-platform.sql ✅ Complete schema
└── quick-setup.sql         ✅ Quick setup
```

---

## 🔧 PRODUCTION OPTIMIZATION

### 1. Update server.js for Production

Add these optimizations to `server.js`:

```javascript
// Add at the top
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Add after express initialization
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Trust proxy (for Nginx)
app.set('trust proxy', 1);
```

### 2. Install Production Dependencies

```bash
cd server
npm install compression helmet express-rate-limit --save
```

### 3. Update package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "prod": "NODE_ENV=production node server.js",
    "setup": "node setup-database.js"
  }
}
```

---

## 📁 CLEAN PROJECT STRUCTURE

### Final Production Structure

```
Calzone_Pay/newnew-main/
│
├── server/                          # Backend
│   ├── server.js                    # Main server
│   ├── start-all.js                 # Startup script
│   ├── setup-database.js            # DB setup
│   ├── db.js                        # DB connection
│   ├── package.json                 # Dependencies
│   ├── .env.production.example      # Env template
│   │
│   ├── middleware/                  # Middleware
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── routes/                      # API Routes
│   │   ├── authRoutes.js
│   │   ├── kycRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── partnerRoutes.js
│   │   ├── rechargeRoutes.js
│   │   ├── walletRoutes.js
│   │   ├── billRoutes.js
│   │   ├── supportRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── operatorRoutes.js
│   │
│   ├── services/                    # External Services
│   │   ├── allBillsService.js
│   │   └── emailService.js
│   │
│   ├── controllers/                 # Business Logic
│   │   └── kycController.js
│   │
│   ├── sql/                         # SQL Files
│   │   ├── schema.sql
│   │   ├── schema-full-platform.sql
│   │   └── quick-setup.sql
│   │
│   └── uploads/                     # Upload directory
│
├── client/                          # Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── partner/
│   │   │   ├── wallet/
│   │   │   ├── recharge/
│   │   │   └── ...
│   │   ├── components/
│   │   ├── services/
│   │   └── context/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── docs/                            # Documentation
    ├── README.md
    ├── PROJECT_SUMMARY.md
    ├── API_TESTING_GUIDE.md
    ├── PRODUCTION_DEPLOYMENT.md
    ├── PRODUCTION_CHECKLIST.md
    └── FULL_ANALYSIS.md
```

---

## 🚀 CLEANUP COMMANDS

### Automated Cleanup Script

Create this file: `cleanup-production.sh`

```bash
#!/bin/bash

echo "🧹 Starting production cleanup..."

cd server

# Remove old migration files
echo "Removing old migration files..."
rm -f execute-schema.js
rm -f run-full-schema.js
rm -f fix-transactions-schema.js
rm -f add-*.js
rm -f migrate-*.js
rm -f check-schema.js

# Remove debug files
echo "Removing debug files..."
rm -f debug-*.js
rm -f test-*.js
rm -f verify-*.js

# Remove duplicate files
echo "Removing duplicate files..."
rm -f server-enhanced.js
rm -f setup-db.js
rm -f seed-data.js

# Clean node_modules (optional)
echo "Cleaning node_modules..."
rm -rf node_modules
npm install --production

echo "✅ Cleanup complete!"
echo "📦 Production-ready files remain"
```

### Run Cleanup

```bash
chmod +x cleanup-production.sh
./cleanup-production.sh
```

---

## ✅ VERIFICATION CHECKLIST

After cleanup, verify:

- [ ] Server starts successfully
- [ ] All API endpoints work
- [ ] Database connection works
- [ ] File uploads work
- [ ] Email service works
- [ ] AllBills API works
- [ ] No console errors
- [ ] All routes accessible

---

## 🔒 SECURITY HARDENING

### 1. Remove Sensitive Data

```bash
# Remove from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

### 2. Update .gitignore

```
# Environment
.env
.env.local
.env.production

# Logs
logs/
*.log

# Uploads
uploads/*
!uploads/.gitkeep

# Dependencies
node_modules/

# Build
dist/
build/

# OS
.DS_Store
Thumbs.db
```

### 3. Secure File Permissions

```bash
chmod 600 .env
chmod 755 server.js
chmod 755 start-all.js
```

---

## 📊 FINAL PRODUCTION CHECKLIST

### Code Quality
- [ ] No unused files
- [ ] No debug code
- [ ] No console.logs in production
- [ ] Error handling everywhere
- [ ] Input validation
- [ ] SQL injection prevention

### Performance
- [ ] Gzip compression enabled
- [ ] Database indexes added
- [ ] Caching implemented
- [ ] Static assets optimized
- [ ] Code minified

### Security
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Rate limiting enabled
- [ ] Security headers added
- [ ] CORS configured
- [ ] SQL injection prevented

### Monitoring
- [ ] Logging configured
- [ ] Error tracking setup
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Backup automated

---

## 🎯 READY FOR PRODUCTION

After completing this cleanup:

1. ✅ Codebase is clean and organized
2. ✅ No unused files
3. ✅ Security hardened
4. ✅ Performance optimized
5. ✅ Production ready

**Your platform is now ready to deploy!** 🚀

---

**Next Step**: Follow PRODUCTION_DEPLOYMENT.md to deploy to your server.
