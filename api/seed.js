import { query } from './db.js';

const seed = async () => {
  try {
    console.log('🌱 Seeding database...');

    // 1. Create Tables
    await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        name_en VARCHAR(100),
        icon VARCHAR(50),
        image_url TEXT
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        stock_quantity INTEGER DEFAULT 10,
        rating DECIMAL(2, 1) DEFAULT 5.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price_at_time DECIMAL(10, 2) NOT NULL,
        customization_details JSONB
      );
    `);

    // 2. Insert Initial Categories
    const categories = [
      ['غرف النوم', 'Bedrooms', 'Bed', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800'],
      ['غرف الجلوس', 'Living Rooms', 'Sofa', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800'],
      ['غرف الطعام', 'Dining Rooms', 'Table2', 'https://images.unsplash.com/photo-1617806118233-18e1c0935474?q=80&w=800'],
    ];

    for (const cat of categories) {
      await query(
        'INSERT INTO categories (name, name_en, icon, image_url) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        cat
      );
    }

    // 3. Insert Initial Products
    const catResult = await query('SELECT id FROM categories LIMIT 1');
    if (catResult.rows.length > 0) {
      const catId = catResult.rows[0].id;
      const products = [
        [catId, 'سرير ملكي فاخر', 'سرير مصنوع من الخشب الطبيعي مع تنجيد مخملي', 12500, 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800'],
        [catId, 'دولاب ملابس عصري', 'دولاب 4 أبواب مع نظام إضاءة داخلي', 8900, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800'],
      ];

      for (const prod of products) {
        await query(
          'INSERT INTO products (category_id, name, description, price, image_url) VALUES ($1, $2, $3, $4, $5)',
          prod
        );
      }
    }

    console.log('✅ Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seed();
