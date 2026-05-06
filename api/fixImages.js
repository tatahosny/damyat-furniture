import { query } from './db.js';

const fixImages = async () => {
  try {
    const result = await query('SELECT id FROM products');
    for (let i = 0; i < result.rows.length; i++) {
      const id = result.rows[i].id;
      const newUrl = `https://picsum.photos/seed/furn${id}/800/600`;
      await query('UPDATE products SET image_url = $1 WHERE id = $2', [newUrl, id]);
    }
    console.log('✅ Images fixed!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixImages();
