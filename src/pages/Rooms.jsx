import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import RoomCard from '../components/rooms/RoomCard'
import { ROOM_TYPES } from '../utils/constants'
import { useState, useMemo } from 'react'
import { Search, LayoutGrid, List } from 'lucide-react'

// ─── Reusable Page Hero ────────────────────────────────────────────────────
const PageHero = ({ image, title, subtitle }) => (
  <div className="relative h-80 flex items-center justify-center overflow-hidden">
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover scale-105"
      style={{ filter: 'brightness(0.4)' }}
    />
    <div className="absolute inset-0"
      style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.5) 0%, rgba(8,6,4,0.85) 100%)' }} />
    <div className="relative z-10 text-center px-6">
      <motion.span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
        style={{ background: 'rgba(180,114,63,0.15)', borderColor: 'rgba(212,162,121,0.35)', color: '#c48650' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✦ دمياط للأثاث
      </motion.span>
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-3"
        style={{
          background: 'linear-gradient(135deg, #f5eae1 0%, #d4a279 50%, #c48650 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-base"
        style={{ color: 'rgba(245,234,225,0.65)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  </div>
)

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const PRICES = [5500, 4200, 6800, 3900, 7500, 8200, 4100, 9600, 5000]

  const roomsWithDetails = useMemo(() =>
    ROOM_TYPES
      .filter(room =>
        room.name.includes(searchTerm) ||
        room.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((room, i) => ({
        ...room,
        startingPrice: PRICES[i] || 5000,
        productCount: [32, 18, 25, 14, 20, 11, 16, 29, 22][i] || 15,
      })),
    [searchTerm]
  )

  return (
    <>
      <Helmet>
        <title>الغرف - دمياط للأثاث</title>
        <meta name="description" content="استكشف مختلف أنواع الغرف والتصاميم الفاخرة المتاحة لدى دمياط للأثاث" />
      </Helmet>

      {/* Page Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&h=600&fit=crop&q=80"
        title="الغرف المتاحة"
        subtitle="اختر غرفتك المفضلة واكتشف تصاميمنا الراقية"
      />

      {/* Search */}
      <div className="py-10" style={{ background: 'linear-gradient(180deg, #0a0804 0%, #0d0a06 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2"
                size={18}
                style={{ color: 'rgba(196,134,74,0.7)' }}
              />
              <input
                type="text"
                placeholder="ابحث عن غرفة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(196,134,74,0.2)',
                  color: 'rgba(245,234,225,0.9)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(196,134,74,0.6)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(196,134,74,0.2)' }}
              />
            </div>

            {/* Result count */}
            <p className="text-center mt-4 text-sm" style={{ color: 'rgba(245,234,225,0.4)' }}>
              عرض{' '}
              <span style={{ color: '#d4a279', fontWeight: 700 }}>{roomsWithDetails.length}</span>
              {' '}غرفة متاحة
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rooms Grid */}
      <section className="pb-24" style={{ background: '#0d0a06' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {roomsWithDetails.length > 0 ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {roomsWithDetails.map((room, idx) => (
                  <RoomCard key={room.id} room={room} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4 opacity-30">🔍</div>
                <p className="text-lg mb-2" style={{ color: 'rgba(245,234,225,0.6)' }}>
                  لم يتم العثور على غرف مطابقة
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                  style={{
                    background: 'rgba(196,134,74,0.15)',
                    border: '1px solid rgba(196,134,74,0.4)',
                    color: '#d4a279',
                  }}
                >
                  مسح البحث
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

export default Rooms
