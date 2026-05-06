import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Minus, 
  Plus,
  Loader2,
  ChevronLeft
} from 'lucide-react'
import { getProductById } from '../services/api'
import { useCartStore } from '../store/cartStore'
import { useFavoritesStore } from '../store/favoritesStore'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedMaterial, setSelectedMaterial] = useState('قماش مخملي')
  const [selectedColor, setSelectedColor] = useState('بيج')
  
  const addItem = useCartStore((state) => state.addItem)
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const isLiked = product ? isFavorite(product.id) : false

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct({
          ...data,
          rating: parseFloat(data.rating),
          price: parseFloat(data.price),
          image: data.image_url
        })
      } catch (err) {
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080604]">
        <Loader2 className="animate-spin text-[#d4a279]" size={48} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#080604] text-white">
        <h2 className="text-3xl font-bold mb-4">المنتج غير موجود</h2>
        <Link to="/products" className="text-[#d4a279] hover:underline">العودة للمنتجات</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
      customizations: { material: selectedMaterial, color: selectedColor }
    })
  }

  const materials = ['خشب زان', 'قماش مخملي', 'جلد طبيعي', 'كتان فاخر']
  const colors = [
    { name: 'بيج', hex: '#f5f5dc' },
    { name: 'رمادي', hex: '#808080' },
    { name: 'كحلي', hex: '#000080' },
    { name: 'بني', hex: '#8b4513' }
  ]

  return (
    <div className="pt-24 pb-20 bg-[#080604]">
      <Helmet>
        <title>{product.name} - دمياط للأثاث</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-[#d4a279] transition-colors">الرئيسية</Link>
          <ChevronLeft size={16} className="mx-2 mt-0.5" />
          <Link to="/products" className="hover:text-[#d4a279] transition-colors">المنتجات</Link>
          <ChevronLeft size={16} className="mx-2 mt-0.5" />
          <span className="text-gray-300 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-900 border border-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-900 border border-white/5 cursor-pointer hover:border-[#d4a279]/50 transition-colors">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#d4a279]/30 bg-[#d4a279]/10 text-[#d4a279]">
                تصميم حصري
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold text-white ml-1">{product.rating}</span>
                <span className="text-xs text-gray-500 font-medium">(120 تقييم)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-[#d4a279]">
                {product.price.toLocaleString('ar-EG')} ج.م
              </span>
              <span className="text-xl text-gray-500 line-through">
                {(product.price * 1.2).toLocaleString('ar-EG')} ج.م
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {product.description || 'قطعة أثاث فاخرة مصممة بعناية فائقة لتضفي لمسة من الجمال والرقي على منزلك. مصنوعة من أجود أنواع الخشب والمواد العالمية لضمان الراحة والمتانة.'}
            </p>

            <div className="space-y-8 mb-10">
              {/* Material Selection */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">المادة المصنعة</h3>
                <div className="flex flex-wrap gap-3">
                  {materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        selectedMaterial === m 
                        ? 'border-[#d4a279] bg-[#d4a279]/10 text-[#d4a279]' 
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">اللون المفضل</h3>
                <div className="flex flex-wrap gap-4">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative w-10 h-10 rounded-full flex items-center justify-center p-0.5 border-2 transition-all ${
                        selectedColor === c.name ? 'border-[#d4a279]' : 'border-transparent'
                      }`}
                    >
                      <span 
                        className="w-full h-full rounded-full shadow-inner" 
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span className="absolute -bottom-6 text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 px-2 h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-grow h-14 bg-gradient-to-r from-[#c48650] to-[#ea845a] rounded-2xl flex items-center justify-center gap-3 text-white font-bold shadow-lg shadow-[#c48650]/20"
              >
                <ShoppingCart size={20} />
                أضف إلى السلة
              </motion.button>

              <button 
                onClick={() => toggleFavorite(product)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                  isLiked ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="text-[#d4a279]" size={24} />
                <span className="text-[10px] font-bold text-gray-300">شحن آمن وسريع</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-x border-white/10 px-4">
                <ShieldCheck className="text-[#d4a279]" size={24} />
                <span className="text-[10px] font-bold text-gray-300">ضمان لمدة 5 سنوات</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw className="text-[#d4a279]" size={24} />
                <span className="text-[10px] font-bold text-gray-300">إرجاع خلال 14 يوم</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
