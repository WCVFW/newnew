# 🚀 Starting Calzone Pay Platform

## Quick Start

You have **3 options** to start the application:

### Option 1: Using start-all.bat (Recommended for Windows)
```bash
start-all.bat
```
This will open both servers in separate command windows for easy monitoring.

### Option 2: Using start-all.js
```bash
node start-all.js
```
This will start both servers in the same terminal window.

### Option 3: Using npm script
```bash
npm run start-all
```
Same as Option 2, but using npm.

### Option 4: Manual Start (Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd server
npm start
# or
node server-enhanced.js
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Access Points

Once started, you can access:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Prerequisites

Before starting, make sure you have:
1. ✅ Node.js v18+ installed
2. ✅ MySQL 8.0+ installed and running
3. ✅ Dependencies installed:
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```
4. ✅ Database setup completed:
   ```bash
   cd server
   node setup-database.js
   ```
5. ✅ Environment variables configured (`.env` file in server directory)

## Troubleshooting

### Error: Cannot find module
- Make sure you're in the correct directory
- Run `npm install` in both `server` and `client` directories

### Error: Database connection failed
- Check if MySQL is running
- Verify database credentials in `.env` file
- Run `node setup-database.js` to create the database

### Port already in use
- Backend (3000): Change `PORT` in `.env` file
- Frontend (5173): Change port in `client/vite.config.js`

## Default Admin Credentials

After database setup, you can login with:
- **Email**: admin@calzonepay.com
- **Password**: admin123

⚠️ **Important**: Change these credentials immediately after first login!

## Need Help?

Check the documentation:
- [LAUNCH_GUIDE.md](../LAUNCH_GUIDE.md) - Complete deployment guide
- [API_TESTING_GUIDE.md](../API_TESTING_GUIDE.md) - API documentation
- [PRODUCTION_DEPLOYMENT.md](../PRODUCTION_DEPLOYMENT.md) - Production setup
