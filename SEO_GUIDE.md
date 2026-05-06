# SEO Optimization Guide - دمياط للأثاث

## Meta Tags

تم تضمين Meta Tags الأساسية في جميع الصفحات:

```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
```

## مولد Sitemap

```bash
# قم بإنشاء ملف sitemap.xml
npm install sitemap
```

## ملف robots.txt

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://damyat.com/sitemap.xml
```

## الكلمات الرئيسية المستهدفة

- أثاث فاخر
- أثاث عصري
- أثاث دمياط
- غرف نوم فاخرة
- أرائك جلدية
- طاولات طعام
- أثاث مكاتب
- تخصيص الأثاث

## تحسينات الأداء

### Code Splitting

```javascript
// استخدام React.lazy للتقسيم الديناميكي
const Home = React.lazy(() => import('./pages/Home'))
const Products = React.lazy(() => import('./pages/Products'))
```

### Image Optimization

```jsx
// استخدام صور محسّنة
<img 
  src="image.webp" 
  alt="وصف الصورة"
  loading="lazy"
  decoding="async"
/>
```

### Lighthouse Score

الأهداف:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

## JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "دمياط للأثاث",
  "url": "https://damyat.com",
  "logo": "https://damyat.com/logo.png",
  "description": "شركة متخصصة في بيع الأثاث الفاخر والعصري",
  "contact": {
    "@type": "ContactPoint",
    "telephone": "+20-123-456-7890",
    "email": "info@damyat.com"
  }
}
```
