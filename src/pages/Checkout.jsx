import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, CheckCircle, ShieldCheck, MapPin, Truck, ChevronRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useState, useEffect } from 'react'
import { createOrder } from '../services/api'

const Checkout = () => {
  const { items, getTotalPrice, getDeliveryFee, clearCart } = useCartStore()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', address: '', city: '', zip: ''
  })

  const [orderId, setOrderId] = useState(null)

  const subtotal = getTotalPrice()
  const deliveryFee = getDeliveryFee()
  const total = subtotal + deliveryFee

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Redirect if cart is empty and not on success step
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      navigate('/cart')
    }
  }, [items.length, navigate, step])

  const handleProcessPayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const orderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        total_price: total,
        payment_method: paymentMethod,
        items: items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          customizations: item.customizations
        }))
      }

      const response = await createOrder(orderData)
      if (response.success) {
        setOrderId(response.orderId)
        setStep(3)
        clearCart()
      }
    } catch (err) {
      console.error('Order failed:', err)
      alert('حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({ label, placeholder, name, type = 'text', required = true }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(245,234,225,0.7)' }}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={formData[name] || ''}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(196,134,74,0.2)',
          color: 'rgba(245,234,225,0.9)',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(196,134,74,0.6)'}
        onBlur={e => e.target.style.borderColor = 'rgba(196,134,74,0.2)'}
      />
    </div>
  )

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0d0a06' }}>
        <Helmet><title>تم الدفع بنجاح - دمياط للأثاث</title></Helmet>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 rounded-3xl text-center"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,134,74,0.15)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(74, 222, 128, 0.1)' }}
          >
            <CheckCircle size={48} style={{ color: '#4ade80' }} />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-2">تم تأكيد طلبك بنجاح!</h1>
          <p className="mb-8" style={{ color: 'rgba(245,234,225,0.6)' }}>
            رقم الطلب: #{Math.floor(Math.random() * 1000000)}<br/>
            سنقوم بإرسال تفاصيل الطلب والتتبع عبر البريد الإلكتروني.
          </p>
          
          <Link
            to="/products"
            className="block w-full py-4 rounded-xl font-bold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)' }}
          >
            متابعة التسوق
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>إتمام الدفع - دمياط للأثاث</title>
      </Helmet>

      <div className="min-h-screen py-12" style={{ background: '#0d0a06' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">إتمام الطلب</h1>
            <div className="flex items-center justify-center gap-4 text-sm font-semibold">
              <span className={step === 1 ? 'text-amber-500' : 'text-gray-500'}>1. الشحن</span>
              <ChevronRight size={16} className="text-gray-600" />
              <span className={step === 2 ? 'text-amber-500' : 'text-gray-500'}>2. الدفع</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Col: Form */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                    className="p-8 rounded-3xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,134,74,0.1)' }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin style={{ color: '#d4a279' }} />
                      <h2 className="text-xl font-bold text-white">تفاصيل الشحن والتوصيل</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="الاسم الأول" name="firstName" placeholder="أحمد" />
                      <InputField label="اسم العائلة" name="lastName" placeholder="محمد" />
                    </div>
                    <InputField label="رقم الهاتف" name="phone" placeholder="+20 1XX XXX XXXX" type="tel" />
                    <InputField label="البريد الإلكتروني" name="email" placeholder="email@example.com" type="email" />
                    <InputField label="العنوان التفصيلي" name="address" placeholder="رقم الشارع، المبنى، الشقة..." />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="المدينة / المحافظة" name="city" placeholder="القاهرة" />
                      <InputField label="الرمز البريدي" name="zip" placeholder="11511" required={false} />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 py-4 rounded-xl font-bold text-white transition-all duration-300 flex justify-center items-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)' }}
                    >
                      المتابعة للدفع <ChevronRight size={18} />
                    </button>
                  </motion.form>
                 )}

                {step === 2 && (
                  <motion.form
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleProcessPayment}
                    className="p-8 rounded-3xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,134,74,0.1)' }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard style={{ color: '#d4a279' }} />
                      <h2 className="text-xl font-bold text-white">طريقة الدفع</h2>
                    </div>

                    <div className="space-y-4 mb-8">
                      {/* Card Option */}
                      <label 
                        className="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300"
                        style={{ 
                          border: paymentMethod === 'card' ? '2px solid #c48650' : '1px solid rgba(196,134,74,0.2)',
                          background: paymentMethod === 'card' ? 'rgba(196,134,74,0.05)' : 'transparent'
                        }}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mr-3 ml-3 accent-amber-600 w-4 h-4"
                        />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="font-bold text-white">بطاقة ائتمان / خصم</span>
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                            <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
                          </div>
                        </div>
                      </label>

                      {/* Cash Option */}
                      <label 
                        className="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300"
                        style={{ 
                          border: paymentMethod === 'cash' ? '2px solid #c48650' : '1px solid rgba(196,134,74,0.2)',
                          background: paymentMethod === 'cash' ? 'rgba(196,134,74,0.05)' : 'transparent'
                        }}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="mr-3 ml-3 accent-amber-600 w-4 h-4"
                        />
                        <span className="font-bold text-white">الدفع عند الاستلام</span>
                      </label>
                    </div>

                    <AnimatePresence>
                      {paymentMethod === 'card' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-4 mb-6"
                        >
                          <InputField label="الاسم على البطاقة" placeholder="AHMED MOHAMED" />
                          <InputField label="رقم البطاقة" placeholder="XXXX XXXX XXXX XXXX" />
                          <div className="grid grid-cols-2 gap-4">
                            <InputField label="تاريخ الانتهاء" placeholder="MM/YY" />
                            <InputField label="CVV" placeholder="123" type="password" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-4 rounded-xl font-bold transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(245,234,225,0.8)' }}
                      >
                        عودة
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)' }}
                      >
                        {loading ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        ) : (
                          <>
                            <ShieldCheck size={18} /> تأكيد الدفع ({total.toLocaleString('ar-EG')} ج.م)
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right Col: Summary */}
            <div className="w-full lg:w-[380px]">
              <div className="p-8 rounded-3xl sticky top-28" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,134,74,0.1)' }}>
                <h2 className="text-xl font-bold text-white mb-6">ملخص الطلب</h2>
                
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#c48650 transparent' }}>
                  {items.map(item => (
                    <div key={item.cartId} className="flex gap-3 pb-4 border-b border-white/5">
                      <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                        {item.customizations?.sizeLabel && (
                          <p className="text-xs text-gray-500 mt-1">المقاس: {item.customizations.sizeLabel}</p>
                        )}
                        <p className="text-xs text-amber-500 mt-1">{item.quantity} × {item.price.toLocaleString('ar-EG')} ج.م</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-gray-400 mb-6">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span className="text-white">{subtotal.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span className="text-white">{deliveryFee === 0 ? 'مجاناً' : `${deliveryFee.toLocaleString('ar-EG')} ج.م`}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white text-lg">الإجمالي</span>
                    <span className="text-2xl font-bold" style={{ color: '#d4a279' }}>{total.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    جميع المعاملات مشفرة وآمنة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
