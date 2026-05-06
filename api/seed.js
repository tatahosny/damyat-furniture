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

    // Clear existing products and categories first to avoid duplicates
    console.log('🧹 Clearing old products...');
    await query('DELETE FROM order_items;'); 
    await query('DELETE FROM products;');
    await query('DELETE FROM categories;');

    for (const cat of categories) {
      await query(
        'INSERT INTO categories (name, name_en, icon, image_url) VALUES ($1, $2, $3, $4)',
        cat
      );
    }

    // 3. Get Category IDs
    const catResult = await query('SELECT id, name_en FROM categories');
    const categoryMap = {};
    catResult.rows.forEach(row => {
      categoryMap[row.name_en] = row.id;
    });

    // 4. Insert Initial Products
    const products = [
      // Bedrooms
      [categoryMap['Bedrooms'], 'سرير ملكي فاخر', 'سرير مصنوع من الخشب الطبيعي مع تنجيد مخملي فاخر وتصميم كلاسيكي رائع.', 12500, 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800'],
      [categoryMap['Bedrooms'], 'دولاب ملابس عصري', 'دولاب 4 أبواب مع نظام إضاءة داخلي ذكي وتقسيمات عملية جداً للملابس.', 8900, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800'],
      [categoryMap['Bedrooms'], 'طقم سرير مودرن', 'سرير بتصميم حديث مع 2 كمودينو وإضاءة ليد مدمجة لإضافة لمسة جمالية للغرفة.', 14200, 'https://images.unsplash.com/photo-1583847268964-b28ce8f30e9c?q=80&w=800'],
      [categoryMap['Bedrooms'], 'تسريحة كلاسيكية', 'تسريحة خشب زان متينة مع مرآة كبيرة مزينة بإطار ذهبي أنيق و 4 أدراج.', 4500, 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?q=80&w=800'],
      [categoryMap['Bedrooms'], 'مرتبة طبية مريحة', 'مرتبة طبية بسوست منفصلة وطبقة ميموري فوم توفر راحة تامة أثناء النوم.', 3200, 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800'],
      [categoryMap['Bedrooms'], 'كومودينو أنيق', 'كومودينو خشبي بلون أبيض ناصع مع درج ومقبض معدني فضي.', 1200, 'https://images.unsplash.com/photo-1532372576444-eaa9731faa46?q=80&w=800'],

      // Living Rooms
      [categoryMap['Living Rooms'], 'ركنة مودرن حرف L', 'ركنة مريحة جداً بتصميم حرف L وقماش قطيفة فاخر مقاوم للبقع والأوساخ.', 15800, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800'],
      [categoryMap['Living Rooms'], 'طقم أنتريه كلاسيك', 'طقم أنتريه يتكون من كنبة 3 مقاعد و 2 فوتيه خشب زان روماني بتصميم راقي.', 22000, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800'],
      [categoryMap['Living Rooms'], 'ترابيزة وسط مودرن', 'ترابيزة قهوة بتصميم عصري يجمع بين الخشب والمعدن الأسود غير اللامع.', 2800, 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800'],
      [categoryMap['Living Rooms'], 'مكتبة تلفزيون خشبية', 'مكتبة تلفزيون عملية مزودة بأرفف وأدراج تخزين تتسع لكل أجهزتك الإلكترونية.', 4200, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'],
      [categoryMap['Living Rooms'], 'كرسي استرخاء (Lazy Boy)', 'كرسي استرخاء مريح جداً بآلية هزاز ودوار ومسند للقدمين لتجربة لا مثيل لها.', 6500, 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?q=80&w=800'],
      [categoryMap['Living Rooms'], 'كنبة سرير عملية', 'كنبة أنيقة يمكن تحويلها بسهولة إلى سرير مريح لاستقبال الضيوف.', 8500, 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=800'],

      // Dining Rooms
      [categoryMap['Dining Rooms'], 'طقم سفرة 6 كراسي', 'سفرة خشب طبيعي مع 6 كراسي منجدة بالكامل بقماش عالي الجودة وتصميم جذاب.', 18500, 'https://images.unsplash.com/photo-1617806118233-18e1c0935474?q=80&w=800'],
      [categoryMap['Dining Rooms'], 'بوفيه سفرة مودرن', 'بوفيه بمساحات تخزين واسعة وتصميم يجمع بين الأناقة والعملية.', 9500, 'https://images.unsplash.com/photo-1595514535415-8ae6bc5dd2e7?q=80&w=800'],
      [categoryMap['Dining Rooms'], 'نيش كلاسيكي', 'نيش عرض خشبي بزجاج شفاف وأرفف داخلية مع إضاءة مدمجة.', 11000, 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=800'],
      [categoryMap['Dining Rooms'], 'طاولة طعام دائرية', 'طاولة دائرية تناسب المساحات الصغيرة مصنوعة من خشب البلوط الصلب.', 6200, 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800'],
      [categoryMap['Dining Rooms'], 'كرسي سفرة فردي', 'كرسي سفرة مريح بتصميم ظهر منحني وأرجل خشبية قوية.', 1500, 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800'],
      [categoryMap['Dining Rooms'], 'طقم سفرة 8 كراسي للعائلات', 'طقم سفرة كبير يناسب العائلات الكبيرة مصمم لتحمل الاستخدام اليومي.', 24000, 'https://images.unsplash.com/photo-1604944985068-d621535eb098?q=80&w=800'],
    ];

    for (const prod of products) {
      if (prod[0]) {
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
