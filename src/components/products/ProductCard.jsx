import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useCartStore } from '../../store/cartStore'
import { useState } from 'react'

const ProductCard = ({ product, onClick }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const addItem = useCartStore((state) => state.addItem)
  const isLiked = isFavorite(product.id)
  const [isHovered, setIsHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, size: 'medium' })
  }

  return (
    <motion.div
      className="group cursor-pointer product-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Image Container ── */}
      <div className="relative h-72 overflow-hidden">
        {/* Discount badge */}
        {product.discount && (
          <motion.div
            className="absolute top-3 right-3 z-20 text-white text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            -{product.discount}%
          </motion.div>
        )}

        {/* Favorite button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product) }}
          className="absolute top-3 left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: isLiked ? 'rgba(220,38,38,0.9)' : 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            background: isLiked ? 'rgba(220,38,38,0.9)' : 'rgba(0,0,0,0.5)',
          }}
        >
          <Heart size={16} className="text-white" fill={isLiked ? 'white' : 'none'} />
        </motion.button>

        {/* Product image */}
        {!imgError ? (
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a1208, #120d08)' }}>
            <div className="text-5xl opacity-30">🪑</div>
          </div>
        )}

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,3,1,0.6) 0%, transparent 60%)' }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* Action buttons on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)', boxShadow: '0 4px 20px rgba(196,134,74,0.4)' }}
            whileHover={{ scale: 1.08, boxShadow: '0 4px 30px rgba(196,134,74,0.6)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 15 }}
            animate={{ y: isHovered ? 0 : 15 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingCart size={16} />
            أضف للسلة
          </motion.button>
        </motion.div>
      </div>

      {/* ── Product Info ── */}
      <div className="p-5">
        <h3 className="font-bold text-base mb-1 text-white truncate">{product.name}</h3>
        <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: 'rgba(245,234,225,0.5)' }}>
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-700'}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: 'rgba(245,234,225,0.4)' }}>
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price + stock */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold" style={{ color: '#d4a279' }}>
              {product.price?.toLocaleString('ar-EG')} ج.م
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: 'rgba(245,234,225,0.3)' }}>
                {product.originalPrice?.toLocaleString('ar-EG')} ج.م
              </span>
            )}
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              background: product.stock > 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              color: product.stock > 0 ? '#4ade80' : '#f87171',
              border: `1px solid ${product.stock > 0 ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
            }}
          >
            {product.stock > 0 ? 'متاح' : 'نفد'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
