import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/products/ProductCard'
import { useState, useMemo, useEffect } from 'react'
import { Search, Sliders, X, ChevronDown, Loader2 } from 'lucide-react'
import { ROOM_TYPES, FURNITURE_SIZES, MATERIALS } from '../utils/constants'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../services/api'

// ─── Filter Tag ─────────────────────────────────────────────────────────────
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
    style={{ background: 'rgba(196,134,74,0.15)', border: '1px solid rgba(196,134,74,0.4)', color: '#d4a279' }}
  >
    {label}
    <button onClick={onRemove} className="hover:text-white transition-colors">
      <X size={12} />
    </button>
  </span>
)

// ─── Checkbox Row ───────────────────────────────────────────────────────────
const FilterCheck = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-1">
    <div
      onClick={onChange}
      className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer"
      style={{
        background: checked ? 'linear-gradient(135deg, #c48650, #ea845a)' : 'rgba(255,255,255,0.06)',
        border: checked ? 'none' : '1px solid rgba(196,134,74,0.25)',
      }}
    >
      {checked && <span className="text-white text-xs font-bold">✓</span>}
    </div>
    <span className="text-sm transition-colors duration-200"
      style={{ color: checked ? '#d4a279' : 'rgba(245,234,225,0.55)' }}
    >
      {label}
    </span>
  </label>
)

// ─── Section Header ─────────────────────────────────────────────────────────
const FilterSection = ({ title, children }) => (
  <div className="pb-5 mb-5" style={{ borderBottom: '1px solid rgba(196,134,74,0.12)' }}>
    <h3 className="font-bold text-sm mb-4 uppercase tracking-widest" style={{ color: '#c48650' }}>
      {title}
    </h3>
    {children}
  </div>
)

const Products = () => {
  const [searchParams] = useSearchParams()
  const initialRoom = searchParams.get('room')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRooms, setSelectedRooms] = useState(initialRoom ? [initialRoom] : [])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(true)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        
        // Map category IDs to room strings if necessary
        const mappedData = data.map(p => ({
          ...p,
          // If the DB category_id is 1, it corresponds to 'bedrooms' in ROOM_TYPES
          room: p.category_id === 1 ? 'bedrooms' : 
                p.category_id === 2 ? 'living-rooms' : 
                p.category_id === 3 ? 'dining-rooms' : 'other',
          // Ensure other fields match expected format
          stock: p.stock_quantity,
          rating: parseFloat(p.rating),
          price: parseFloat(p.price)
        }))
        
        setProducts(mappedData)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = p.name.includes(searchTerm) || (p.description && p.description.includes(searchTerm))
      const matchRoom = selectedRooms.length === 0 || selectedRooms.includes(p.room)
      const matchSize = selectedSizes.length === 0 || (p.size && selectedSizes.includes(p.size))
      const matchMaterial = selectedMaterials.length === 0 || (p.material && selectedMaterials.includes(p.material))
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      return matchSearch && matchRoom && matchSize && matchMaterial && matchPrice
    })
    if (sortBy === 'price-low')  result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating)
    return result
  }, [searchTerm, selectedRooms, selectedSizes, selectedMaterials, priceRange, sortBy])

  const toggle = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val])

  const resetFilters = () => {
    setSelectedRooms([]); setSelectedSizes([]); setSelectedMaterials([])
    setPriceRange([0, 50000]); setSortBy('newest'); setSearchTerm('')
  }

  const activeFilterCount = selectedRooms.length + selectedSizes.length + selectedMaterials.length

  return (
    <>
      <Helmet>
        <title>المنتجات - دمياط للأثاث</title>
        <meta name="description" content="استكشف كتالوجنا الكامل من الأثاث الفاخر — غرف نوم، جلوس، طعام وأكثر" />
      </Helmet>

      {/* Page Hero */}
      <div className="relative h-72 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400&h=500&fit=crop&q=80"
          alt="Products"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.4), rgba(8,6,4,0.9))' }} />
        <div className="relative z-10 text-center px-6">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
            style={{ background: 'rgba(180,114,63,0.15)', borderColor: 'rgba(212,162,121,0.35)', color: '#c48650' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✦ الكاتلوج الكامل
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #f5eae1, #d4a279, #c48650)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            منتجاتنا
          </motion.h1>
          <motion.p className="mt-3 text-base" style={{ color: 'rgba(245,234,225,0.6)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            اكتشف أجمل تشكيلة من الأثاث الفاخر
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12" style={{ background: '#0d0a06' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Left: filter toggle + active count */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: showFilters ? 'rgba(196,134,74,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${showFilters ? 'rgba(196,134,74,0.6)' : 'rgba(196,134,74,0.15)'}`,
                  color: showFilters ? '#d4a279' : 'rgba(245,234,225,0.6)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Sliders size={16} />
                الفلاتر
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)' }}>
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>

              <span className="text-sm" style={{ color: 'rgba(245,234,225,0.4)' }}>
                <span style={{ color: '#d4a279', fontWeight: 700 }}>{filteredProducts.length}</span> منتج
              </span>
            </div>

            {/* Right: search + sort */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(196,134,74,0.6)' }} />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-9 pl-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(196,134,74,0.2)',
                    color: 'rgba(245,234,225,0.9)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(196,134,74,0.55)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(196,134,74,0.2)' }}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(196,134,74,0.2)',
                  color: 'rgba(245,234,225,0.8)',
                  minWidth: '140px',
                }}
              >
                <option value="newest" style={{ background: '#1a1208' }}>الأحدث</option>
                <option value="price-low" style={{ background: '#1a1208' }}>السعر: من الأقل</option>
                <option value="price-high" style={{ background: '#1a1208' }}>السعر: من الأعلى</option>
                <option value="rating" style={{ background: '#1a1208' }}>الأعلى تقييمًا</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedRooms.map(r => (
                <FilterTag key={r} label={ROOM_TYPES.find(x => x.id === r)?.name || r}
                  onRemove={() => toggle(selectedRooms, setSelectedRooms, r)} />
              ))}
              {selectedSizes.map(s => (
                <FilterTag key={s} label={FURNITURE_SIZES.find(x => x.id === s)?.name || s}
                  onRemove={() => toggle(selectedSizes, setSelectedSizes, s)} />
              ))}
              {selectedMaterials.map(m => (
                <FilterTag key={m} label={MATERIALS.find(x => x.id === m)?.name || m}
                  onRemove={() => toggle(selectedMaterials, setSelectedMaterials, m)} />
              ))}
              <button onClick={resetFilters}
                className="text-xs px-3 py-1 rounded-full transition-all"
                style={{ color: 'rgba(245,234,225,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => { e.target.style.color = '#f87171' }}
                onMouseLeave={e => { e.target.style.color = 'rgba(245,234,225,0.4)' }}
              >
                مسح الكل
              </button>
            </div>
          )}

          {/* Body: sidebar + grid */}
          <div className="flex gap-8">

            {/* Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0 overflow-hidden"
                >
                  <div className="w-[260px] sticky top-24 p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,134,74,0.12)' }}>

                    <FilterSection title="الغرف">
                      {ROOM_TYPES.map(room => (
                        <FilterCheck key={room.id}
                          checked={selectedRooms.includes(room.id)}
                          onChange={() => toggle(selectedRooms, setSelectedRooms, room.id)}
                          label={room.name}
                        />
                      ))}
                    </FilterSection>

                    <FilterSection title="الحجم">
                      {FURNITURE_SIZES.map(size => (
                        <FilterCheck key={size.id}
                          checked={selectedSizes.includes(size.id)}
                          onChange={() => toggle(selectedSizes, setSelectedSizes, size.id)}
                          label={size.name}
                        />
                      ))}
                    </FilterSection>

                    <FilterSection title="المادة">
                      {MATERIALS.map(m => (
                        <FilterCheck key={m.id}
                          checked={selectedMaterials.includes(m.id)}
                          onChange={() => toggle(selectedMaterials, setSelectedMaterials, m.id)}
                          label={m.name}
                        />
                      ))}
                    </FilterSection>

                    {/* Price Range */}
                    <div className="mb-5">
                      <h3 className="font-bold text-sm mb-4 uppercase tracking-widest" style={{ color: '#c48650' }}>
                        نطاق السعر
                      </h3>
                      <input
                        type="range" min="0" max="50000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-1 appearance-none rounded-full cursor-pointer"
                        style={{ accentColor: '#c48650' }}
                      />
                      <div className="flex justify-between text-xs mt-2" style={{ color: 'rgba(245,234,225,0.45)' }}>
                        <span>0 ج.م</span>
                        <span style={{ color: '#d4a279', fontWeight: 600 }}>{priceRange[1].toLocaleString('ar-EG')} ج.م</span>
                      </div>
                    </div>

                    {activeFilterCount > 0 && (
                      <button onClick={resetFilters}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.25)',
                          color: '#f87171',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
                      >
                        إعادة تعيين الكل
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    className="flex flex-col items-center justify-center py-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 size={48} className="animate-spin mb-4" style={{ color: '#d4a279' }} />
                    <p style={{ color: 'rgba(245,234,225,0.6)' }}>جاري تحميل المنتجات...</p>
                  </motion.div>
                ) : filteredProducts.length > 0 ? (
                  <motion.div
                    key="products"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="text-center py-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-6xl mb-4 opacity-25">📦</div>
                    <p className="text-lg mb-4" style={{ color: 'rgba(245,234,225,0.55)' }}>
                      لا توجد منتجات مطابقة للفلاتر المحددة
                    </p>
                    <button onClick={resetFilters}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #c48650, #ea845a)',
                        color: 'white',
                        boxShadow: '0 0 20px rgba(196,134,74,0.3)',
                      }}
                    >
                      مسح جميع الفلاتر
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
