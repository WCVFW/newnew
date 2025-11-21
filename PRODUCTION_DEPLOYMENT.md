# 🚀 PRODUCTION DEPLOYMENT GUIDE

## Complete Guide to Deploy Calzone Pay to Production

---

## 📋 Pre-Deployment Checklist

### 1. Server Requirements
- [ ] Ubuntu 20.04+ or CentOS 8+ server
- [ ] Minimum 2GB RAM, 2 CPU cores
- [ ] 20GB+ storage
- [ ] Root or sudo access
- [ ] Domain name configured
- [ ] SSL certificate ready

### 2. Software Requirements
- [ ] Node.js v18+ installed
- [ ] MySQL 8.0+ installed
- [ ] Nginx installed
- [ ] PM2 process manager
- [ ] Git installed

---

## 🔧 STEP 1: Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should be v18+
npm --version
```

### 1.3 Install MySQL
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

### 1.4 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Install PM2
```bash
sudo npm install -g pm2
```

### 1.6 Install Git
```bash
sudo apt install git -y
```

---

## 🗄️ STEP 2: Database Setup

### 2.1 Create Database
```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE calzone_pay_production;
CREATE USER 'calzone_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON calzone_pay_production.* TO 'calzone_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2.2 Import Schema
```bash
# Upload your project files first
cd /var/www/calzone-pay/server
mysql -u calzone_user -p calzone_pay_production < schema-full-platform.sql

# Or run the setup script
node setup-database.js
```

---

## 📦 STEP 3: Deploy Backend

### 3.1 Clone Repository
```bash
sudo mkdir -p /var/www/calzone-pay
cd /var/www/calzone-pay
sudo git clone <your-repo-url> .
# Or upload files via FTP/SFTP
```

### 3.2 Install Dependencies
```bash
cd /var/www/calzone-pay/server
npm install --production
```

### 3.3 Configure Environment
```bash
nano .env
```

**Production .env file:**
```env
# Database Configuration
DB_HOST=localhost
DB_USER=calzone_user
DB_PASSWORD=YOUR_STRONG_PASSWORD
DB_NAME=calzone_pay_production

# JWT Configuration
JWT_SECRET=CHANGE_THIS_TO_RANDOM_64_CHAR_STRING_IN_PRODUCTION

# Server Configuration
PORT=3000
NODE_ENV=production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# AllBills API
ALLBILLS_CUSTOMER_ID=3176029605
ALLBILLS_TOKEN=6FGuGViLkD0f4Y2UppBonx00l

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.com

# Admin Email
ADMIN_EMAIL=admin@yourdomain.com
```

### 3.4 Update server.js for Production
```bash
nano server.js
```

Add CORS configuration:
```javascript
// Add after other imports
import cors from 'cors';

// Add before routes
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://yourdomain.com',
  credentials: true
}));
```

### 3.5 Start with PM2
```bash
pm2 start server.js --name calzone-pay-backend
pm2 save
pm2 startup
# Follow the command it gives you
```

### 3.6 Configure PM2 Monitoring
```bash
pm2 logs calzone-pay-backend
pm2 monit
```

---

## 🌐 STEP 4: Deploy Frontend

### 4.1 Update API Base URL
```bash
cd /var/www/calzone-pay/client/src/services
nano api.ts
```

Update baseURL:
```typescript
const api = axios.create({
  baseURL: 'https://api.yourdomain.com',  // Change this
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 4.2 Build Frontend
```bash
cd /var/www/calzone-pay/client
npm install
npm run build
```

### 4.3 Move Build Files
```bash
sudo mkdir -p /var/www/html/calzone-pay
sudo cp -r dist/* /var/www/html/calzone-pay/
sudo chown -R www-data:www-data /var/www/html/calzone-pay
```

---

## 🔒 STEP 5: SSL Certificate (Let's Encrypt)

### 5.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 5.2 Obtain Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

### 5.3 Auto-Renewal
```bash
sudo certbot renew --dry-run
```

---

## 🌍 STEP 6: Nginx Configuration

### 6.1 Frontend Configuration
```bash
sudo nano /etc/nginx/sites-available/calzone-pay-frontend
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/html/calzone-pay;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

### 6.2 Backend API Configuration
```bash
sudo nano /etc/nginx/sites-available/calzone-pay-backend
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 6.3 Enable Sites
```bash
sudo ln -s /etc/nginx/sites-available/calzone-pay-frontend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/calzone-pay-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔥 STEP 7: Firewall Configuration

```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
sudo ufw status
```

---

## 📊 STEP 8: Monitoring & Logging

### 8.1 PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 8.2 Nginx Logs
```bash
# View access logs
sudo tail -f /var/log/nginx/access.log

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### 8.3 Application Logs
```bash
pm2 logs calzone-pay-backend --lines 100
```

---

## 🔄 STEP 9: Backup Strategy

### 9.1 Database Backup Script
```bash
sudo nano /usr/local/bin/backup-calzone-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/calzone-pay"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

mysqldump -u calzone_user -p'YOUR_PASSWORD' calzone_pay_production > $BACKUP_DIR/db_backup_$DATE.sql
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-calzone-db.sh
```

### 9.2 Setup Cron Job
```bash
sudo crontab -e
```

Add:
```
0 2 * * * /usr/local/bin/backup-calzone-db.sh
```

---

## 🧪 STEP 10: Testing Production

### 10.1 Test Backend
```bash
curl https://api.yourdomain.com/api/auth/login
```

### 10.2 Test Frontend
```bash
curl https://yourdomain.com
```

### 10.3 Test Database Connection
```bash
cd /var/www/calzone-pay/server
node -e "const pool = require('./db.js'); pool.getConnection().then(() => console.log('DB Connected')).catch(err => console.error(err));"
```

---

## 🚀 STEP 11: Go Live!

### 11.1 Final Checks
- [ ] SSL certificate working
- [ ] Backend API responding
- [ ] Frontend loading
- [ ] Database connected
- [ ] PM2 running
- [ ] Nginx configured
- [ ] Firewall enabled
- [ ] Backups configured
- [ ] Monitoring active

### 11.2 DNS Configuration
Point your domain to server IP:
```
A Record: yourdomain.com → YOUR_SERVER_IP
A Record: www.yourdomain.com → YOUR_SERVER_IP
A Record: api.yourdomain.com → YOUR_SERVER_IP
```

### 11.3 Test Complete Flow
1. Visit https://yourdomain.com
2. Register new user
3. Login
4. Submit KYC
5. Test recharge
6. Check wallet
7. Test all features

---

## 🔧 STEP 12: Maintenance Commands

### Restart Backend
```bash
pm2 restart calzone-pay-backend
```

### View Logs
```bash
pm2 logs calzone-pay-backend
```

### Update Code
```bash
cd /var/www/calzone-pay
git pull origin main
cd server && npm install
pm2 restart calzone-pay-backend
cd ../client && npm run build
sudo cp -r dist/* /var/www/html/calzone-pay/
```

### Database Backup
```bash
/usr/local/bin/backup-calzone-db.sh
```

### Check Server Status
```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status mysql
```

---

## 📈 STEP 13: Performance Optimization

### 13.1 Enable Nginx Caching
```nginx
# Add to nginx config
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;
proxy_cache api_cache;
proxy_cache_valid 200 5m;
```

### 13.2 Database Optimization
```sql
-- Add indexes
ALTER TABLE transactions ADD INDEX idx_user_created (user_id, created_at);
ALTER TABLE wallet_transactions ADD INDEX idx_wallet_created (wallet_id, created_at);
ALTER TABLE commissions ADD INDEX idx_partner_created (partner_id, created_at);
```

### 13.3 PM2 Cluster Mode
```bash
pm2 delete calzone-pay-backend
pm2 start server.js --name calzone-pay-backend -i max
pm2 save
```

---

## 🔐 STEP 14: Security Hardening

### 14.1 Fail2Ban
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 14.2 Secure MySQL
```bash
sudo mysql_secure_installation
```

### 14.3 Update Regularly
```bash
sudo apt update && sudo apt upgrade -y
```

---

## 📞 STEP 15: Support & Monitoring

### 15.1 Setup Uptime Monitoring
- Use UptimeRobot.com (free)
- Monitor: https://yourdomain.com
- Monitor: https://api.yourdomain.com

### 15.2 Error Tracking
- Setup Sentry.io (optional)
- Add error logging

### 15.3 Analytics
- Google Analytics
- Mixpanel (optional)

---

## 🎉 DEPLOYMENT COMPLETE!

Your Calzone Pay platform is now live at:
- **Frontend**: https://yourdomain.com
- **Backend API**: https://api.yourdomain.com

---

## 📋 Quick Reference

### Important Files
```
/var/www/calzone-pay/          # Application root
/var/www/html/calzone-pay/     # Frontend build
/etc/nginx/sites-available/    # Nginx configs
/var/log/nginx/                # Nginx logs
~/.pm2/logs/                   # PM2 logs
/var/backups/calzone-pay/      # Database backups
```

### Important Commands
```bash
pm2 restart calzone-pay-backend    # Restart backend
pm2 logs calzone-pay-backend       # View logs
sudo systemctl reload nginx         # Reload nginx
sudo systemctl restart mysql        # Restart MySQL
```

---

## 🆘 Troubleshooting

### Backend Not Starting
```bash
pm2 logs calzone-pay-backend
# Check for errors
```

### Database Connection Failed
```bash
mysql -u calzone_user -p calzone_pay_production
# Test connection
```

### Nginx 502 Error
```bash
sudo nginx -t
pm2 status
# Check if backend is running
```

### SSL Certificate Issues
```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

**Your platform is now LIVE and ready for production use!** 🚀

**Support**: Refer to documentation files for detailed guides.
