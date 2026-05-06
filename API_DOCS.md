# وثائق API - Damyat Furniture

## 🔗 Base URL

```
http://localhost:5000/api
```

## 🔐 المصادقة

استخدم JWT Token في Header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📦 المنتجات (Products)

### جميع المنتجات

```
GET /products
```

**البارامترات:**
- `limit` - عدد النتائج (افتراضي: 20)
- `offset` - رقم الصفحة (افتراضي: 0)
- `room_id` - فلترة حسب الغرفة
- `sort` - ترتيب (price, rating, newest)

**الرد:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "منتج",
      "price": 1000,
      "image_url": "...",
      "rating": 4.5,
      "stock": 10
    }
  ],
  "total": 100
}
```

### منتج واحد

```
GET /products/:id
```

### البحث

```
GET /products/search?q=سرير
```

### إضافة منتج (Admin)

```
POST /products
Content-Type: application/json

{
  "name": "منتج جديد",
  "description": "وصف",
  "price": 5000,
  "room_id": 1,
  "image_url": "...",
  "stock": 20,
  "material": "خشب"
}
```

## 🏠 الغرف (Rooms)

### جميع الغرف

```
GET /rooms
```

**الرد:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "غرف النوم",
      "description": "...",
      "image_url": "...",
      "product_count": 15
    }
  ]
}
```

## 🛒 الطلبات (Orders)

### إنشاء طلب

```
POST /orders
Content-Type: application/json

{
  "customer_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 5000
    }
  ],
  "total_price": 10000,
  "shipping_address": "..."
}
```

**الرد:**
```json
{
  "id": 1,
  "customer_id": 1,
  "status": "pending",
  "total_price": 10000,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### جميع الطلبات

```
GET /orders
Authorization: Bearer TOKEN (Admin Only)
```

### طلب واحد

```
GET /orders/:id
Authorization: Bearer TOKEN
```

### تحديث الطلب

```
PUT /orders/:id
Content-Type: application/json

{
  "status": "shipped",
  "tracking_number": "..."
}
```

### إلغاء الطلب

```
POST /orders/:id/cancel
```

## 🎨 الأثاث المخصص (Custom Furniture)

### إنشاء طلب مخصص

```
POST /custom-furniture
Content-Type: application/json

{
  "customer_id": 1,
  "product_id": 1,
  "dimensions_width": 200,
  "dimensions_height": 150,
  "dimensions_depth": 80,
  "notes": "ملاحظات إضافية"
}
```

**الرد:**
```json
{
  "id": 1,
  "product_id": 1,
  "custom_price": 6500,
  "estimated_days": 14,
  "status": "pending"
}
```

### جميع الطلبات المخصصة

```
GET /custom-furniture
```

## 👥 العملاء (Customers)

### إنشاء عميل / تسجيل

```
POST /customers/register
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+20 123 456 7890",
  "password": "password123"
}
```

### تسجيل الدخول

```
POST /customers/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**الرد:**
```json
{
  "token": "jwt_token_here",
  "customer": {
    "id": 1,
    "name": "أحمد محمد",
    "email": "ahmed@example.com"
  }
}
```

### بيانات العميل

```
GET /customers/me
Authorization: Bearer TOKEN
```

### تحديث البيانات

```
PUT /customers/me
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "أحمد علي",
  "phone": "+20 987 654 3210"
}
```

## ⭐ التقييمات (Reviews)

### إضافة تقييم

```
POST /reviews
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "product_id": 1,
  "rating": 5,
  "comment": "منتج ممتاز جداً"
}
```

### تقييمات المنتج

```
GET /products/:id/reviews
```

**الرد:**
```json
{
  "data": [
    {
      "id": 1,
      "customer_name": "أحمد",
      "rating": 5,
      "comment": "ممتاز",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "average_rating": 4.5,
  "total_reviews": 50
}
```

## 📧 التواصل (Contact)

### إرسال رسالة

```
POST /contact
Content-Type: application/json

{
  "name": "أحمد",
  "email": "ahmed@example.com",
  "phone": "+20 123 456 7890",
  "subject": "استفسار",
  "message": "رسالتي هنا"
}
```

**الرد:**
```json
{
  "success": true,
  "message": "تم استقبال رسالتك بنجاح"
}
```

## 🔐 المصادقة (Auth)

### تسجيل الدخول

```
POST /auth/login
```

### تجديد Token

```
POST /auth/refresh
Authorization: Bearer REFRESH_TOKEN
```

### تسجيل الخروج

```
POST /auth/logout
Authorization: Bearer TOKEN
```

### تحديث كلمة المرور

```
POST /auth/update-password
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "current_password": "old_password",
  "new_password": "new_password"
}
```

## ❌ أكواد الخطأ

| Code | المعنى |
|------|--------|
| 200  | نجاح |
| 201  | تم الإنشاء |
| 400  | طلب غير صحيح |
| 401  | غير مصرح |
| 403  | محظور |
| 404  | غير موجود |
| 500  | خطأ في الخادم |

## 🔄 Pagination

```javascript
// الطلب
GET /products?limit=20&offset=0

// الرد
{
  "data": [...],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "pages": 8
  }
}
```

## 📋 Filters و Sorting

```
GET /products?room_id=1&material=wood&sort=price&order=asc
```

## 🧪 أمثلة باستخدام cURL

### الحصول على المنتجات

```bash
curl -X GET http://localhost:5000/api/products
```

### إنشاء طلب

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "customer_id": 1,
    "items": [{"product_id": 1, "quantity": 1}],
    "total_price": 5000
  }'
```

## 📚 أمثلة بـ JavaScript

```javascript
// استجلاب جميع المنتجات
const products = await fetch('/api/products')
  .then(r => r.json())

// إضافة منتج إلى السلة
const addToCart = async (productId, quantity) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ product_id: productId, quantity })
  })
  return response.json()
}
```

---

للاستفسارات والدعم: support@damyat.com
