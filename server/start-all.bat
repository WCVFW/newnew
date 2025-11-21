@echo off
echo ========================================
echo   Starting Calzone Pay Platform
echo ========================================
echo.
echo Starting Backend Server...
echo Backend will run on: http://localhost:3000
echo.
echo Starting Frontend Server...
echo Frontend will run on: http://localhost:5173
echo.
echo ========================================
echo   Press Ctrl+C to stop all servers
echo ========================================
echo.

start "Calzone Pay - Backend" cmd /k "cd /d %~dp0 && node server-enhanced.js"
timeout /t 3 /nobreak > nul
start "Calzone Pay - Frontend" cmd /k "cd /d %~dp0..\client && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
pause
