# دليل النشر (Deployment) - دمياط للأثاث

## قبل النشر

- [ ] اختبار الموقع بالكامل محلياً
- [ ] التحقق من الأداء (Lighthouse)
- [ ] اختبار جميع الصفحات والميزات
- [ ] معاينة الإصدار النهائي

## خيارات النشر

### 1️⃣ Vercel (الخيار الأسهل والأسرع)

#### الخطوات:

1. **إنشاء حساب**
   - اذهب إلى https://vercel.com
   - سجل دخولك بـ GitHub/GitLab

2. **ربط المشروع**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **إعدادات المتغيرات البيئية**
   - في لوحة التحكم → Settings → Environment Variables
   ```
   VITE_API_URL=your_api_url
   VITE_APP_NAME=دمياط للأثاث
   ```

4. **النشر التلقائي**
   - كل push إلى main سيتم نشره تلقائياً

### 2️⃣ Netlify

#### الخطوات:

1. **إنشاء حساب**
   - اذهب إلى https://netlify.com
   - سجل دخولك

2. **ربط المشروع**
   ```bash
   npm install -g netlify-cli
   netlify init
   ```

3. **إعدادات Build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **النشر**
   ```bash
   netlify deploy --prod
   ```

### 3️⃣ Server خاص (VPS)

#### المتطلبات:

- Server مع Ubuntu 20.04+
- Nginx/Apache
- Node.js و npm
- SSL Certificate

#### خطوات النشر:

1. **الاتصال بالخادم**
   ```bash
   ssh user@server.com
   ```

2. **تثبيت المتطلبات**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

3. **استنساخ المشروع**
   ```bash
   cd /var/www
   sudo git clone your_repo.git
   cd damyat-furniture
   ```

4. **تثبيت المكتبات وبناء الإصدار**
   ```bash
   npm install
   npm run build
   ```

5. **إعداد Nginx**
   ```nginx
   server {
       listen 80;
       server_name damyat.com www.damyat.com;

       root /var/www/damyat-furniture/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static files
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Compression
       gzip on;
       gzip_types text/plain text/css text/javascript application/json application/javascript image/svg+xml;
   }
   ```

6. **تفعيل SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d damyat.com -d www.damyat.com
   ```

7. **تشغيل Nginx**
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

### 4️⃣ Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine
RUN npm install -g serve

WORKDIR /app
COPY --from=0 /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### بناء وتشغيل الحاوية

```bash
docker build -t damyat-furniture .
docker run -p 3000:3000 damyat-furniture
```

## إعدادات الإنتاج

### متغيرات البيئة

```env
VITE_API_URL=https://api.damyat.com
VITE_APP_NAME=دمياط للأثاث
NODE_ENV=production
```

### تحسينات الأداء

```bash
# تقليل حجم الملفات
npm run build
# التحقق من حجم الحزم
npm run analyze
```

## تحسين الأداء بعد النشر

### 1. CDN
- استخدام Cloudflare أو StackPath
- تخزين مؤقت للملفات الثابتة

### 2. Monitoring
```bash
npm install -g pm2
pm2 start npm -- start
pm2 logs
```

### 3. Analytics
- Google Analytics
- Hotjar
- New Relic

## حل المشاكل الشائعة

### الصفحات البيضاء
```bash
# تحقق من الأخطاء في browser console
# تأكد من متغيرات البيئة
# إعادة بناء المشروع
```

### بطء التحميل
```bash
# فعّل الضغط
# استخدم CDN
# قلل حجم الملفات
```

### مشاكل CORS
```javascript
// في backend server.js
app.use(cors({
  origin: 'https://damyat.com',
  credentials: true
}));
```

## Checklist النشر النهائي

- [ ] اختبار جميع الروابط
- [ ] التحقق من SSL
- [ ] اختبار الأداء
- [ ] اختبار المتصفحات المختلفة
- [ ] اختبار الهاتف النقال
- [ ] تشغيل Lighthouse
- [ ] إعداد analytics
- [ ] إعداد backups
- [ ] توثيق الإجراءات

## الدعم والمساعدة

للمزيد من المساعدة:
- الاطلاع على الوثائق: docs/
- التواصل: support@damyat.com
- منتدى المساعدة: https://help.damyat.com
