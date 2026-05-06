import { query } from './db.js';

const fixImages = async () => {
  try {
    const productsRes = await query('SELECT p.id, c.name_en FROM products p JOIN categories c ON p.category_id = c.id');
    for (const row of productsRes.rows) {
      let imageUrl = '';
      if (row.name_en === 'Bedrooms') {
        imageUrl = '/images/premium_bedroom.png';
      } else if (row.name_en === 'Living Rooms') {
        imageUrl = '/images/premium_livingroom.png';
      } else if (row.name_en === 'Dining Rooms') {
        imageUrl = '/images/premium_diningroom.png';
      } else {
        imageUrl = '/images/premium_livingroom.png'; // fallback
      }
      
      await query('UPDATE products SET image_url = $1 WHERE id = $2', [imageUrl, row.id]);
    }
    console.log('✅ Real images mapped by category!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixImages();
