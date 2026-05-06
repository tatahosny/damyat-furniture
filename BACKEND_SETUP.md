# Backend Setup Guide - دمياط للأثاث

## المتطلبات

- Node.js 16+
- PostgreSQL (أو Neon Database)
- npm/yarn

## التثبيت

### 1. إنشاء مجلد Backend

```bash
mkdir backend
cd backend
npm init -y
```

### 2. تثبيت المكتبات

```bash
npm install express cors dotenv pg axios bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

### 3. ملف package.json

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

## ملف البيئة

```bash
# .env
DATABASE_URL=postgresql://user:password@host:5432/damyat
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## ملف الخادم الأساسي

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { customer_id, items, total_price } = req.body;
    const result = await pool.query(
      'INSERT INTO orders (customer_id, total_price) VALUES ($1, $2) RETURNING *',
      [customer_id, total_price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
```

## إعدادات Database

استخدم الأوامر التالية لإعداد قاعدة البيانات:

```sql
-- تشغيل جميع أوامر SQL الموجودة في ملف DATABASE_SCHEMA.md
```

## التطوير

```bash
npm run dev
```

الخادم سيعمل على `http://localhost:5000`

## النشر

- **Render**: https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://www.heroku.com
