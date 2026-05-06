import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Package, CreditCard } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { ROOM_FURNITURE_CATALOG } from '../utils/constants'
import { useState } from 'react'

const Cart = () => {
  const { items, updateQuantity, removeItem, updateItemCustomization, getTotalPrice, getDeliveryFee, clearCart } = useCartStore()
  const navigate = useNavigate()

  // Group items by roomPackageId
  const packageGroups = {}
  const individualItems = []

  items.forEach(item => {
    if (item.roomPackageId) {
      if (!packageGroups[item.roomPackageId]) {
        packageGroups[item.roomPackageId] = {
          name: item.roomName || 'باقة غرفة',
          items: []
        }
      }
      packageGroups[item.roomPackageId].items.push(item)
    } else {
      individualItems.push(item)
    }
  })

  const subtotal = getTotalPrice()
  const deliveryFee = getDeliveryFee()
  const total = subtotal + deliveryFee

  // Handle size change for a specific item
  const handleSizeChange = (cartId, roomId, pieceId, selectedSizeId) => {
    const roomCatalog = ROOM_FURNITURE_CATALOG[roomId]
    if (!roomCatalog) return
    const piece = roomCatalog.pieces.find(p => p.id === pieceId)
    if (!piece) return
    const newSize = piece.sizes.find(s => s.id === selectedSizeId)
    if (!newSize) return

    updateItemCustomization(cartId, { size: newSize.id, sizeLabel: newSize.label, dims: newSize.dims }, newSize.price)
  }

  // Render a single cart item
  const renderItem = (item, isPackageItem = false) => {
    // Find size options if this item is part of the catalog
    let sizeOptions = []
    let roomId = null
    let pieceId = null

    // If it's a catalog item added via room package
    if (item.catalogRoomId && item.catalogPieceId) {
      roomId = item.catalogRoomId
      pieceId = item.catalogPieceId
      sizeOptions = ROOM_FURNITURE_CATALOG[roomId]?.pieces.find(p => p.id === pieceId)?.sizes || []
    }

    return (
      <motion.div
        key={item.cartId}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl relative group"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,134,74,0.1)' }}
      >
        {/* Item Image */}
        <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#120d08' }}>
          <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover opacity-80" />
        </div>

        {/* Item Details */}
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
              {item.customizations?.sizeLabel && (
                <p className="text-xs" style={{ color: 'rgba(245,234,225,0.5)' }}>
                  المقاس: {item.customizations.sizeLabel} ({item.customizations.dims})
                </p>
              )}
            </div>
            {!isPackageItem && (
              <button
                onClick={() => removeItem(item.cartId)}
                className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                title="حذف"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {/* Size Customization Dropdown (if part of catalog) */}
          {sizeOptions.length > 0 && (
            <div className="mb-3">
              <label className="text-xs mb-1 block" style={{ color: '#d4a279' }}>تخصيص المقاس:</label>
              <select
                value={item.customizations?.size || sizeOptions[0].id}
                onChange={(e) => handleSizeChange(item.cartId, roomId, pieceId, e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg text-sm outline-none cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(196,134,74,0.2)',
                  color: 'rgba(245,234,225,0.9)',
                }}
              >
                {sizeOptions.map(size => (
                  <option key={size.id} value={size.id} style={{ background: '#1a1208' }}>
                    {size.label} - {size.dims} (+{size.price.toLocaleString('ar-EG')} ج.م)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-lg" style={{ color: '#d4a279' }}>
              {(item.price * item.quantity).toLocaleString('ar-EG')} ج.م
            </span>

            {/* Quantity controls */}
            {!isPackageItem && (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="text-gray-400 hover:text-white transition-colors">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-semibold min-w-[20px] text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="text-gray-400 hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <Helmet>
        <title>عربة التسوق - دمياط للأثاث</title>
      </Helmet>

      {/* Hero */}
      <div className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, #1a1208 0%, #080604 100%)' }} />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #f5eae1, #d4a279, #c48650)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingCart size={36} className="text-amber-500" />
            عربة التسوق
          </motion.h1>
        </div>
      </div>

      <section className="py-12" style={{ background: '#0d0a06', minHeight: '60vh' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(196,134,74,0.1)' }}>
                <ShoppingCart size={48} style={{ color: '#c48650' }} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">عربة التسوق فارغة</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">لم تقم بإضافة أي منتجات إلى عربة التسوق بعد. استكشف مجموعتنا الفاخرة وابدأ التسوق.</p>
              <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white transition-all" style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)' }}>
                استكشف المنتجات <ArrowLeft size={18} />
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Items List */}
              <div className="flex-1 space-y-8">
                {/* Room Packages */}
                {Object.entries(packageGroups).map(([packageId, pkg]) => (
                  <div key={packageId} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(196,134,74,0.2)' }}>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                      <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Package style={{ color: '#d4a279' }} /> {pkg.name} (باقة كاملة)
                      </h2>
                      <button
                        onClick={() => pkg.items.forEach(i => removeItem(i.cartId))}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        إزالة الباقة
                      </button>
                    </div>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {pkg.items.map(item => renderItem(item, true))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}

                {/* Individual Items */}
                {individualItems.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white pb-2 border-b border-white/5">منتجات فردية</h2>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {individualItems.map(item => renderItem(item))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-[400px]"
              >
                <div className="p-8 rounded-2xl sticky top-28" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,134,74,0.15)' }}>
                  <h2 className="text-2xl font-bold mb-6 text-white">ملخص الطلب</h2>
                  
                  <div className="space-y-4 mb-6 text-sm" style={{ color: 'rgba(245,234,225,0.7)' }}>
                    <div className="flex justify-between items-center">
                      <span>المجموع الفرعي ({items.length} منتجات)</span>
                      <span className="font-bold text-white">{subtotal.toLocaleString('ar-EG')} ج.م</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>رسوم التوصيل</span>
                      <span className="font-bold text-white">
                        {deliveryFee === 0 ? <span className="text-green-400">مجاناً</span> : `${deliveryFee.toLocaleString('ar-EG')} ج.م`}
                      </span>
                    </div>
                    {deliveryFee > 0 && (
                      <p className="text-xs text-amber-500/70">التوصيل مجاني للطلبات فوق 20,000 ج.م</p>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">الإجمالي</span>
                      <span className="text-2xl font-bold" style={{ color: '#d4a279' }}>{total.toLocaleString('ar-EG')} ج.م</span>
                    </div>
                    <p className="text-xs mt-1 text-gray-500 text-left">شامل ضريبة القيمة المضافة</p>
                  </div>

                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)', boxShadow: '0 4px 20px rgba(196,134,74,0.3)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 4px 30px rgba(196,134,74,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCard size={20} />
                    المتابعة للدفع
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-4 text-xs" style={{ color: 'rgba(245,234,225,0.4)' }}>
                    <span>🔒 دفع آمن وموثوق</span>
                    <span>•</span>
                    <span>↩️ إرجاع خلال 30 يوم</span>
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Cart
