# البدء السريع - Damyat Furniture

## ⚡ خطوات البدء بسرعة

### 1. التثبيت

```bash
# استنساخ المشروع
git clone <repo-url>
cd damyat-furniture

# تثبيت المكتبات
npm install

# نسخ ملف البيئة
cp .env.example .env
```

### 2. التشغيل المحلي

```bash
# بدء خادم التطوير
npm run dev

# سيفتح الموقع على: http://localhost:3000
```

### 3. البناء والنشر

```bash
# بناء الإصدار النهائي
npm run build

# عرض الإصدار
npm run preview
```

## 📝 مثال على إضافة صفحة جديدة

### 1. إنشاء الصفحة

```jsx
// src/pages/NewPage.jsx
import { motion } from 'framer-motion'
import { Section, Container, Button } from '../components/common/UIComponents'

const NewPage = () => {
  return (
    <>
      <Section>
        <Container>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            صفحة جديدة
          </motion.h1>
        </Container>
      </Section>
    </>
  )
}

export default NewPage
```

### 2. إضافة المسار

```jsx
// src/App.jsx
import NewPage from './pages/NewPage'

<Routes>
  {/* الطرق الأخرى */}
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

### 3. إضافة الرابط في الـ Navigation

```jsx
// src/components/layout/Navbar.jsx
const navLinks = [
  // ...الروابط الأخرى
  { name: 'الصفحة الجديدة', nameEn: 'New Page', path: '/new-page' },
]
```

## 🎨 أمثلة على الاستخدام

### استخدام Buttons

```jsx
import { Button } from '@/components/common/UIComponents'

<Button variant="primary" size="lg">
  زر أساسي
</Button>

<Button variant="outline" size="md">
  زر مخطط
</Button>
```

### استخدام Cards

```jsx
import { Card } from '@/components/common/UIComponents'

<Card>
  <h3>عنوان الكارد</h3>
  <p>محتوى الكارد</p>
</Card>
```

### الحركات مع Framer Motion

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  محتوى متحرك
</motion.div>
```

### استخدام Hooks

```jsx
import { useFetch, useDebounce } from '@/hooks'

// استجلاب البيانات
const { data, loading, error } = useFetch(() => 
  productsAPI.getAll()
)

// debounce البحث
const debouncedSearch = useDebounce(searchTerm, 500)
```

## 📊 إضافة بيانات جديدة

### تحديث البيانات الثابتة

```javascript
// src/utils/constants.js
export const ROOM_TYPES = [
  {
    id: 'new-room',
    name: 'غرفة جديدة',
    // ... المزيد من الخصائص
  },
  // ...
]
```

### استجلاب البيانات من API

```jsx
import { productsAPI } from '@/api/services'
import { useFetch } from '@/hooks'

const ProductList = () => {
  const { data: products } = useFetch(() => 
    productsAPI.getAll()
  )

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 🔐 إدارة الحالة

### استخدام Zustand

```jsx
import { useCartStore } from '@/store/cartStore'

const MyComponent = () => {
  const { items, addItem, removeItem } = useCartStore()

  return (
    <>
      {items.map(item => (
        <div key={item.id}>
          {item.name} - {item.price}
          <button onClick={() => removeItem(item.id)}>
            حذف
          </button>
        </div>
      ))}
    </>
  )
}
```

## 🎯 أفضل الممارسات

1. **استخدم المكونات القابلة لإعادة الاستخدام**
   - ضع المكونات الشائعة في `components/common`

2. **اتبع نمط التسمية العربية/الإنجليزية**
   - استخدم `name` و `nameEn` للنصوص

3. **استخدم Tailwind للأنماط**
   - تجنب CSS Files عند الإمكان

4. **احفظ البيانات في Store**
   - استخدم Zustand للحالة العامة

5. **أضف Helmet للـ SEO**
   - ضع الـ Meta Tags لكل صفحة

## 🐛 تصحيح الأخطاء

### تفعيل وضع Debug

```javascript
// في .env
VITE_DEBUG=true
```

### فتح Browser DevTools

```bash
# في Vite
Ctrl/Cmd + Shift + I
```

### تفقد وحدة التحكم

```bash
npm run dev
# انظر إلى terminal للأخطاء
```

## 📱 اختبار على الهاتف

```bash
# احصل على IP عنوان جهازك
ipconfig getifaddr en0  # Mac/Linux
ipconfig              # Windows

# افتح في الهاتف
http://YOUR_IP:3000
```

## 📚 الموارد المفيدة

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/introduction/)
- [Zustand](https://github.com/pmndrs/zustand)

---

**استمتع بتطويرك! 🚀**
