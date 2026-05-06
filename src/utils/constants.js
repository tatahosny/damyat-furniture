// Room Types
export const ROOM_TYPES = [
  {
    id: 'bedrooms',
    name: 'غرف النوم',
    nameEn: 'Bedrooms',
    icon: 'Bed',
    description: 'أثاث غرف نوم فاخر وعصري',
    descriptionEn: 'Luxury Modern Bedroom Furniture',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'living-rooms',
    name: 'غرف الجلوس',
    nameEn: 'Living Rooms',
    icon: 'Sofa',
    description: 'أرائك ومقاعد مريحة وأنيقة',
    descriptionEn: 'Comfortable & Elegant Sofas',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'dining-rooms',
    name: 'غرف الطعام',
    nameEn: 'Dining Rooms',
    icon: 'Table2',
    description: 'طاولات وكراسي فاخرة للطعام',
    descriptionEn: 'Premium Dining Tables & Chairs',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c0935474?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'outdoor',
    name: 'الأثاث الخارجي',
    nameEn: 'Outdoor',
    icon: 'Sun',
    description: 'أثاث حدائق فاخر ومقاوم للعوامل الجوية',
    descriptionEn: 'Premium Weather-Resistant Outdoor Furniture',
    image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'reception',
    name: 'غرف الاستقبال',
    nameEn: 'Reception',
    icon: 'Users',
    description: 'أثاث استقبال راقي للضيوف',
    descriptionEn: 'Elegant Reception Furniture for Guests',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-rose-500 to-red-500',
  },
  {
    id: 'cinema',
    name: 'غرف السينما',
    nameEn: 'Home Cinema',
    icon: 'Film',
    description: 'كراسي وتجهيزات غرف السينما المنزلية',
    descriptionEn: 'Home Cinema Chairs & Equipment',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'kids-rooms',
    name: 'غرف الأطفال',
    nameEn: 'Kids Rooms',
    icon: 'Smile',
    description: 'أثاث آمن وملون للأطفال',
    descriptionEn: 'Safe & Colorful Kids Furniture',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-pink-400 to-rose-400',
  },
  {
    id: 'offices',
    name: 'المكاتب',
    nameEn: 'Offices',
    icon: 'Briefcase',
    description: 'مكاتب وكراسي مكتبية احترافية',
    descriptionEn: 'Professional Office Furniture',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-gray-600 to-slate-700',
  },
  {
    id: 'kitchens',
    name: 'المطابخ الحديثة',
    nameEn: 'Modern Kitchens',
    icon: 'ChefHat',
    description: 'خزائن ومطابخ عصرية وعملية',
    descriptionEn: 'Modern & Functional Kitchens',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&h=600&auto=format&fit=crop',
    color: 'from-red-600 to-orange-600',
  },
]

// Furniture Sizes
export const FURNITURE_SIZES = [
  { id: 'small', name: 'صغير', nameEn: 'Small', priceMultiplier: 0.8 },
  { id: 'medium', name: 'متوسط', nameEn: 'Medium', priceMultiplier: 1 },
  { id: 'large', name: 'كبير', nameEn: 'Large', priceMultiplier: 1.3 },
  { id: 'xl', name: 'كبير جداً', nameEn: 'Extra Large', priceMultiplier: 1.6 },
]

// Materials
export const MATERIALS = [
  { id: 'wood', name: 'خشب', nameEn: 'Wood' },
  { id: 'leather', name: 'جلد', nameEn: 'Leather' },
  { id: 'fabric', name: 'نسيج', nameEn: 'Fabric' },
  { id: 'metal', name: 'معدن', nameEn: 'Metal' },
  { id: 'glass', name: 'زجاج', nameEn: 'Glass' },
  { id: 'mixed', name: 'مخلوط', nameEn: 'Mixed' },
]

// Colors
export const COLORS = [
  { id: 'black', name: 'أسود', hex: '#000000' },
  { id: 'white', name: 'أبيض', hex: '#FFFFFF' },
  { id: 'brown', name: 'بني', hex: '#8B4513' },
  { id: 'gray', name: 'رمادي', hex: '#808080' },
  { id: 'beige', name: 'بيج', hex: '#F5E6D3' },
  { id: 'navy', name: 'أزرق بحري', hex: '#000080' },
]

// Product Rating
export const RATING_OPTIONS = [
  { value: 5, label: '★★★★★', text: 'ممتاز' },
  { value: 4, label: '★★★★☆', text: 'جيد جداً' },
  { value: 3, label: '★★★☆☆', text: 'جيد' },
  { value: 2, label: '★★☆☆☆', text: 'مقبول' },
  { value: 1, label: '★☆☆☆☆', text: 'ضعيف' },
]

// ─── Room Furniture Catalog ─────────────────────────────────────────────────
// Full furniture list per room with detailed size options and pricing
export const ROOM_FURNITURE_CATALOG = {
  'bedrooms': {
    roomName: 'غرفة النوم',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
    pieces: [
      {
        id: 'bed', name: 'السرير', icon: '🛏️',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: 'single', label: 'مفرد',     dims: '90 × 190 سم',  price: 5500  },
          { id: 'double', label: 'مزدوج',    dims: '140 × 190 سم', price: 8500  },
          { id: 'queen',  label: 'كوين',     dims: '160 × 200 سم', price: 12000 },
          { id: 'king',   label: 'كينج',     dims: '180 × 200 سم', price: 16000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',   price: 18000 },
        ],
      },
      {
        id: 'wardrobe', name: 'الدولاب', icon: '🚪',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: '2door',  label: 'بابين',    dims: '100 × 200 سم', price: 4500  },
          { id: '3door',  label: '3 أبواب',  dims: '150 × 200 سم', price: 6500  },
          { id: '4door',  label: '4 أبواب',  dims: '200 × 220 سم', price: 9000  },
          { id: 'corner', label: 'زاوية',    dims: '250 × 220 سم', price: 12000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',   price: 14000 },
        ],
      },
      {
        id: 'mirror', name: 'المرايا', icon: '🪞',
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغيرة',    dims: '60 × 80 سم',   price: 800  },
          { id: 'medium', label: 'متوسطة',   dims: '80 × 120 سم',  price: 1400 },
          { id: 'large',  label: 'كبيرة',    dims: '100 × 150 سم', price: 2200 },
          { id: 'floor',  label: 'أرضية',    dims: '60 × 180 سم',  price: 3000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',   price: 3500 },
        ],
      },
      {
        id: 'dresser', name: 'التسريحة', icon: '💄',
        image: 'https://images.unsplash.com/photo-1540932239986-310128078ceb?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغيرة',   dims: '80 × 140 سم',  price: 3500 },
          { id: 'medium', label: 'متوسطة',  dims: '100 × 150 سم', price: 5000 },
          { id: 'large',  label: 'كبيرة',   dims: '120 × 160 سم', price: 7000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',  price: 8000 },
        ],
      },
      {
        id: 'nightstand', name: 'كومودينو', icon: '🔲',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'single', label: 'قطعة واحدة', dims: '45 × 55 سم', price: 900  },
          { id: 'pair',   label: 'زوج',        dims: '45 × 55 سم', price: 1600 },
          { id: 'custom', label: 'مقاس خاص',  dims: 'حسب الطلب',  price: 2000 },
        ],
      },
    ],
  },
  'living-rooms': {
    roomName: 'غرفة الجلوس',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
    pieces: [
      {
        id: 'sofa', name: 'الأريكة', icon: '🛋️',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: '2seat',  label: 'مقعدين',  dims: '150 × 85 سم',  price: 6500  },
          { id: '3seat',  label: '3 مقاعد', dims: '200 × 90 سم',  price: 9500  },
          { id: 'lshape', label: 'شكل L',   dims: '270 × 160 سم', price: 15000 },
          { id: 'ushape', label: 'شكل U',   dims: '350 × 200 سم', price: 22000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',  price: 25000 },
        ],
      },
      {
        id: 'coffee-table', name: 'طاولة القهوة', icon: '☕',
        image: 'https://images.unsplash.com/photo-1610316213223-11105bb8a84f?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغيرة',   dims: '60 × 60 سم',  price: 1200 },
          { id: 'medium', label: 'متوسطة',  dims: '80 × 80 سم',  price: 2000 },
          { id: 'large',  label: 'كبيرة',   dims: '120 × 70 سم', price: 3200 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب', price: 4000 },
        ],
      },
      {
        id: 'tv-unit', name: 'وحدة التلفزيون', icon: '📺',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: '120cm',  label: '120 سم',  dims: '120 × 45 سم', price: 3500 },
          { id: '150cm',  label: '150 سم',  dims: '150 × 45 سم', price: 5000 },
          { id: '180cm',  label: '180 سم',  dims: '180 × 45 سم', price: 6500 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب', price: 9000 },
        ],
      },
      {
        id: 'armchair', name: 'كرسي بذراعين', icon: '🪑',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'standard', label: 'قياسي',      dims: '80 × 85 سم',  price: 2800 },
          { id: 'large',    label: 'كبير',        dims: '95 × 95 سم',  price: 4000 },
          { id: 'recliner', label: 'راحة أمامية', dims: '90 × 100 سم', price: 6500 },
          { id: 'custom',   label: 'مقاس خاص',   dims: 'حسب الطلب',  price: 7000 },
        ],
      },
    ],
  },
  'dining-rooms': {
    roomName: 'غرفة الطعام',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c0935474?q=80&w=800&auto=format&fit=crop',
    pieces: [
      {
        id: 'dining-table', name: 'طاولة الطعام', icon: '🍽️',
        image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: '4seat',  label: '4 أشخاص',  dims: '120 × 80 سم',  price: 5500  },
          { id: '6seat',  label: '6 أشخاص',  dims: '160 × 90 سم',  price: 8500  },
          { id: '8seat',  label: '8 أشخاص',  dims: '200 × 100 سم', price: 12000 },
          { id: '10seat', label: '10 أشخاص', dims: '240 × 110 سم', price: 16000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',   price: 20000 },
        ],
      },
      {
        id: 'dining-chairs', name: 'كراسي الطعام', icon: '🪑',
        image: 'https://images.unsplash.com/photo-1603300648691-ee52f0e88965?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: '4chairs', label: '4 كراسي', dims: '45 × 45 سم', price: 3200 },
          { id: '6chairs', label: '6 كراسي', dims: '45 × 45 سم', price: 4800 },
          { id: '8chairs', label: '8 كراسي', dims: '45 × 45 سم', price: 6400 },
          { id: 'custom',  label: 'عدد خاص', dims: 'حسب الطلب',  price: 2000 },
        ],
      },
      {
        id: 'buffet', name: 'البوفيه', icon: '🗄️',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغير',    dims: '100 × 80 سم', price: 4000  },
          { id: 'medium', label: 'متوسط',   dims: '140 × 90 سم', price: 6000  },
          { id: 'large',  label: 'كبير',    dims: '180 × 95 سم', price: 8500  },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب', price: 10000 },
        ],
      },
    ],
  },
  'offices': {
    roomName: 'المكتب',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    pieces: [
      {
        id: 'desk', name: 'مكتب العمل', icon: '🖥️',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: 'small',  label: 'صغير',    dims: '100 × 60 سم', price: 3500  },
          { id: 'medium', label: 'متوسط',   dims: '140 × 70 سم', price: 5500  },
          { id: 'large',  label: 'كبير',    dims: '180 × 80 سم', price: 7500  },
          { id: 'lshape', label: 'شكل L',   dims: '200 × 160 سم', price: 10000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب', price: 12000 },
        ],
      },
      {
        id: 'office-chair', name: 'كرسي المكتب', icon: '💺',
        image: 'https://images.unsplash.com/photo-1544480503-c8120d76b82e?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: 'basic',   label: 'أساسي',           dims: 'قياسي',      price: 2000 },
          { id: 'comfort', label: 'مريح',             dims: 'مع مساند',  price: 3500 },
          { id: 'exec',    label: 'تنفيذي فاخر',     dims: 'مميز',      price: 6000 },
          { id: 'custom',  label: 'مواصفات خاصة',    dims: 'حسب الطلب', price: 8000 },
        ],
      },
      {
        id: 'bookshelf', name: 'مكتبة الكتب', icon: '📚',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغيرة',   dims: '80 × 180 سم',  price: 2500 },
          { id: 'medium', label: 'متوسطة',  dims: '100 × 200 سم', price: 3800 },
          { id: 'large',  label: 'كبيرة',   dims: '150 × 220 سم', price: 5500 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',  price: 7000 },
        ],
      },
    ],
  },
  'kids-rooms': {
    roomName: 'غرفة الأطفال',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    pieces: [
      {
        id: 'kids-bed', name: 'سرير الأطفال', icon: '🛏️',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: 'toddler', label: 'أطفال صغار', dims: '70 × 140 سم', price: 2500 },
          { id: 'single',  label: 'مفرد',        dims: '90 × 190 سم', price: 3500 },
          { id: 'bunk',    label: 'دورين',        dims: '90 × 190 سم', price: 6500 },
          { id: 'custom',  label: 'مقاس خاص',    dims: 'حسب الطلب',  price: 8000 },
        ],
      },
      {
        id: 'kids-desk', name: 'مكتب الدراسة', icon: '📝',
        image: 'https://images.unsplash.com/photo-1544480503-c8120d76b82e?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغير',    dims: '80 × 50 سم',  price: 1500 },
          { id: 'medium', label: 'متوسط',   dims: '100 × 60 سم', price: 2200 },
          { id: 'large',  label: 'كبير',    dims: '120 × 65 سم', price: 3000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب', price: 3500 },
        ],
      },
      {
        id: 'kids-wardrobe', name: 'دولاب الأطفال', icon: '🚪',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: '2door',  label: 'بابين',    dims: '100 × 180 سم', price: 3000 },
          { id: '3door',  label: '3 أبواب',  dims: '150 × 190 سم', price: 4500 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',   price: 5500 },
        ],
      },
    ],
  },
  'reception': {
    roomName: 'غرفة الاستقبال',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop',
    pieces: [
      {
        id: 'reception-sofa', name: 'أريكة الاستقبال', icon: '🛋️',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop',
        required: true,
        sizes: [
          { id: '3seat',  label: '3 مقاعد',  dims: '200 × 90 سم',  price: 12000 },
          { id: 'lshape', label: 'شكل L',    dims: '280 × 160 سم', price: 20000 },
          { id: 'ushape', label: 'شكل U',    dims: '360 × 200 سم', price: 30000 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',   price: 35000 },
        ],
      },
      {
        id: 'center-table', name: 'الطاولة الوسطى', icon: '🔲',
        image: 'https://images.unsplash.com/photo-1610316213223-11105bb8a84f?q=80&w=400&auto=format&fit=crop',
        required: false,
        sizes: [
          { id: 'small',  label: 'صغيرة',   dims: '80 × 80 سم',   price: 2500 },
          { id: 'large',  label: 'كبيرة',   dims: '120 × 120 سم', price: 4500 },
          { id: 'custom', label: 'مقاس خاص', dims: 'حسب الطلب',  price: 6000 },
        ],
      },
    ],
  },
}
