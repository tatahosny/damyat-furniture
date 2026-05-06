import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await query('SELECT * FROM categories ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all products (with optional category filter)
app.get('/api/products', async (req, res) => {
  const { category_id } = req.query;
  try {
    let sql = 'SELECT * FROM products';
    const params = [];

    if (category_id) {
      sql += ' WHERE category_id = $1';
      params.push(category_id);
    }

    sql += ' ORDER BY created_at DESC';
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create an order
app.post('/api/orders', async (req, res) => {
  const { 
    customer_name, 
    customer_email, 
    customer_phone, 
    address, 
    total_price, 
    payment_method,
    items 
  } = req.body;

  try {
    // Start transaction
    await query('BEGIN');

    // 1. Insert into orders
    const orderResult = await query(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, address, total_price, payment_method) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [customer_name, customer_email, customer_phone, address, total_price, payment_method]
    );

    const orderId = orderResult.rows[0].id;

    // 2. Insert order items
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_time, customization_details) 
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.id, item.quantity, item.price, JSON.stringify(item.customizations)]
      );
    }

    await query('COMMIT');
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    await query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Submit a contact message
app.post('/api/messages', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    await query(
      'INSERT INTO messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, subject, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
