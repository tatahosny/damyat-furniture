import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCartStore } from '../../store/cartStore'
import { ROOM_FURNITURE_CATALOG } from '../../utils/constants'

const RoomCard = ({ room, index }) => {
  const [imgError, setImgError] = useState(false)
  const addRoomPackage = useCartStore(state => state.addRoomPackage)

  const handleAddRoom = (roomId, roomName) => {
    const catalog = ROOM_FURNITURE_CATALOG[roomId]
    if (catalog) {
      const items = catalog.pieces.map(piece => {
        const defaultSize = piece.sizes[0]
        return {
          id: piece.id, // basic ID for the item
          name: piece.name,
          price: defaultSize.price,
          image: piece.image,
          catalogRoomId: roomId,
          catalogPieceId: piece.id,
          customizations: {
            size: defaultSize.id,
            sizeLabel: defaultSize.label,
            dims: defaultSize.dims
          }
        }
      })
      addRoomPackage(roomId, roomName, items)
      alert(`تمت إضافة باقة ${roomName} بنجاح! يمكنك تخصيص المقاسات من السلة.`)
    }
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        height: '320px',
        border: '1px solid rgba(196,134,74,0.15)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{
        borderColor: 'rgba(196,134,74,0.5)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(196,134,74,0.12)',
      }}
    >
      {/* Background Image */}
      {!imgError ? (
        <motion.img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1a1208, #0d0804)' }}>
          <span className="text-6xl opacity-20">🏠</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 room-card-overlay transition-opacity duration-500 group-hover:opacity-95" />

      {/* Subtle gold top shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(196,134,74,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
        >
          {/* Price badge */}
          <div className="mb-3">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'rgba(196,134,74,0.2)',
                border: '1px solid rgba(196,134,74,0.4)',
                color: '#d4a279',
                backdropFilter: 'blur(10px)',
              }}
            >
              ابدأ من {room.startingPrice?.toLocaleString('ar-EG')} ج.م
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-1 text-white leading-tight">{room.name}</h3>
          <p className="text-sm mb-5 line-clamp-2 leading-relaxed" style={{ color: 'rgba(245,234,225,0.65)' }}>
            {room.description}
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ x: 10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.06 }}
          >
            <Link
              to={`/products?room=${room.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(196,134,74,0.85), rgba(234,132,90,0.85))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(196,134,74,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 25px rgba(196,134,74,0.55)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(196,134,74,0.3)'
              }}
            >
              اكتشف المنتجات
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>

            {ROOM_FURNITURE_CATALOG[room.id] && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddRoom(room.id, room.name)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(196,134,74,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(196,134,74,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(196,134,74,0.3)'
                }}
              >
                <ShoppingCart size={16} />
                باقة الغرفة
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RoomCard
