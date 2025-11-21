@echo off
echo ========================================
echo  PRODUCTION CLEANUP SCRIPT
echo ========================================
echo.

cd server

echo [1/5] Removing old migration files...
if exist execute-schema.js del execute-schema.js
if exist run-full-schema.js del run-full-schema.js
if exist fix-transactions-schema.js del fix-transactions-schema.js
if exist add-recharge-columns.js del add-recharge-columns.js
if exist add-razorpay-payment-id.js del add-razorpay-payment-id.js
if exist add-razorpay-column.js del add-razorpay-column.js
if exist migrate-blobs.js del migrate-blobs.js
if exist migrate-transactions-table.js del migrate-transactions-table.js
if exist check-schema.js del check-schema.js
echo    - Migration files removed

echo.
echo [2/5] Removing debug/test files...
if exist debug-kyc.js del debug-kyc.js
if exist test-api.js del test-api.js
if exist verify-admin-user.js del verify-admin-user.js
echo    - Debug files removed

echo.
echo [3/5] Removing duplicate files...
if exist server-enhanced.js del server-enhanced.js
if exist setup-db.js del setup-db.js
if exist seed-data.js del seed-data.js
if exist add-admin-user.js del add-admin-user.js
echo    - Duplicate files removed

echo.
echo [4/5] Creating production directories...
if not exist logs mkdir logs
if not exist uploads mkdir uploads
if not exist backups mkdir backups
echo    - Directories created

echo.
echo [5/5] Installing production dependencies...
call npm install compression helmet express-rate-limit --save
echo    - Dependencies installed

echo.
echo ========================================
echo  CLEANUP COMPLETE!
echo ========================================
echo.
echo Production-ready files:
echo  - server.js
echo  - start-all.js
echo  - setup-database.js
echo  - All route files
echo  - All service files
echo  - Middleware files
echo.
echo Next steps:
echo  1. Review .env file
echo  2. Run: node setup-database.js
echo  3. Run: node start-all.js
echo  4. Deploy to production
echo.
pause
