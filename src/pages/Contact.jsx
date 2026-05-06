import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { submitMessage } from '../services/api'

// ─── Reusable luxury input ──────────────────────────────────────────────────
const LuxuryInput = ({ label, type = 'text', name, value, onChange, placeholder, required, rows }) => {
  const [focused, setFocused] = useState(false)
  const baseStyle = {
    width: '100%',
    padding: rows ? '12px 16px' : '14px 16px',
    borderRadius: '12px',
    outline: 'none',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused ? 'rgba(196,134,74,0.6)' : 'rgba(196,134,74,0.18)'}`,
    color: 'rgba(245,234,225,0.9)',
    fontSize: '0.9rem',
    resize: 'none',
    transition: 'border-color 0.3s',
  }
  const Tag = rows ? 'textarea' : 'input'
  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(245,234,225,0.7)' }}>
        {label} {required && <span style={{ color: '#c48650' }}>*</span>}
      </label>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={baseStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState(0)


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await submitMessage(formData)
      if (response.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (err) {
      console.error('Failed to send message:', err)
      setError('عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى التأكد من اتصالك أو المحاولة لاحقاً.')
      setTimeout(() => setError(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: Phone, title: 'اتصل بنا', content: '+20 123 456 7890', sub: 'متاح 6 أيام أسبوعياً', href: 'tel:+201234567890' },
    { icon: Mail, title: 'البريد الإلكتروني', content: 'info@damyat-furniture.com', sub: 'رد خلال 24 ساعة', href: 'mailto:info@damyat-furniture.com' },
    { icon: MapPin, title: 'زورونا', content: 'دمياط الجديدة، مصر', sub: 'صالة عرض مفتوحة', href: '#' },
  ]

  const faqs = [
    { q: 'ما هي مدة التسليم؟', a: 'نسلم الطلبات في غضون 7-14 يوم عمل داخل مصر، حسب نوع المنتج والموقع.' },
    { q: 'هل يتوفر ضمان على المنتجات؟', a: 'جميع منتجاتنا مضمونة لمدة 5 سنوات كاملة ضد عيوب التصنيع.' },
    { q: 'ما هي سياسة الإرجاع؟', a: 'يمكنك إرجاع أي منتج خلال 30 يوماً من الاستلام في حالته الأصلية.' },
    { q: 'هل توفرون خدمة التخصيص؟', a: 'نعم، نقدم خدمة تخصيص كاملة: الأبعاد، الخامة، اللون، والتصميم.' },
    { q: 'هل يوجد خدمة توصيل مجاني؟', a: 'نعم، التوصيل مجاني لجميع الطلبات داخل محافظة دمياط. لباقي المحافظات حسب المسافة.' },
  ]

  return (
    <>
      <Helmet>
        <title>تواصل معنا - دمياط للأثاث</title>
        <meta name="description" content="تواصل مع دمياط للأثاث للاستفسار عن منتجاتنا وخدماتنا المتميزة" />
      </Helmet>

      {/* ── Page Hero ────────────────────────────────────────────────────────── */}
      <div className="relative h-72 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&h=500&fit=crop&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.4), rgba(8,6,4,0.92))' }} />
        <div className="relative z-10 text-center px-6">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
            style={{ background: 'rgba(180,114,63,0.15)', borderColor: 'rgba(212,162,121,0.35)', color: '#c48650' }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          >
            ✦ نحن هنا لمساعدتك
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #f5eae1, #d4a279, #c48650)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            تواصل معنا
          </motion.h1>
          <motion.p className="mt-3 text-base" style={{ color: 'rgba(245,234,225,0.6)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            نحن هنا للإجابة على جميع استفساراتك
          </motion.p>
        </div>
      </div>

      {/* ── Contact Cards ────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: '#0a0804' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                className="relative p-8 rounded-2xl text-center group overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(196,134,74,0.15)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(196,134,74,0.5)' }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(196,134,74,0.08) 0%, transparent 70%)' }} />

                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(196,134,74,0.2), rgba(234,132,90,0.15))', border: '1px solid rgba(196,134,74,0.3)' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <info.icon size={28} style={{ color: '#d4a279' }} />
                </motion.div>
                <h3 className="text-lg font-bold mb-1 text-white">{info.title}</h3>
                <p className="font-semibold mb-1 transition-colors duration-300 group-hover:text-amber-400"
                  style={{ color: '#d4a279' }}>{info.content}</p>
                <p className="text-xs" style={{ color: 'rgba(245,234,225,0.4)' }}>{info.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: '#0d0a06' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form (3 cols) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,134,74,0.15)' }}>
                <h2 className="text-3xl font-bold mb-2 text-white">أرسل لنا رسالة</h2>
                <p className="text-sm mb-8" style={{ color: 'rgba(245,234,225,0.45)' }}>
                  سنرد عليك خلال 24 ساعة عمل
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center py-16 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle size={64} style={{ color: '#4ade80' }} />
                      </motion.div>
                      <h3 className="text-2xl font-bold mt-4 mb-2 text-white">تم الإرسال بنجاح!</h3>
                      <p style={{ color: 'rgba(245,234,225,0.55)' }}>سنتواصل معك قريباً. شكراً لثقتك بنا.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="flex items-center gap-3 p-4 rounded-xl"
                            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                          >
                            <AlertCircle size={20} style={{ color: '#ef4444' }} className="flex-shrink-0" />
                            <p className="text-sm font-medium" style={{ color: '#ef4444' }}>{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <LuxuryInput label="الاسم" name="name" value={formData.name} onChange={handleChange} placeholder="اسمك الكامل" required />
                        <LuxuryInput label="رقم الهاتف" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+20 1XX XXX XXXX" />
                      </div>
                      <LuxuryInput label="البريد الإلكتروني" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
                      <LuxuryInput label="الموضوع" name="subject" value={formData.subject} onChange={handleChange} placeholder="موضوع رسالتك" />
                      <LuxuryInput label="الرسالة" name="message" value={formData.message} onChange={handleChange} placeholder="اكتب تفاصيل استفسارك هنا..." required rows={5} />

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl font-bold text-base text-white flex items-center justify-center gap-3 transition-all duration-300"
                        style={{
                          background: loading ? 'rgba(196,134,74,0.4)' : 'linear-gradient(135deg, #c48650, #ea845a)',
                          boxShadow: loading ? 'none' : '0 0 30px rgba(196,134,74,0.35)',
                        }}
                        whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 50px rgba(196,134,74,0.5)' } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            جاري الإرسال...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            إرسال الرسالة
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sidebar info (2 cols) */}
            <motion.div
              className="lg:col-span-2 space-y-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* WhatsApp CTA */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(37,211,102,0.15)' }}>
                    <MessageSquare size={20} style={{ color: '#25d366' }} />
                  </div>
                  <h3 className="font-bold text-white">تواصل عبر واتس آب</h3>
                </div>
                <p className="text-sm mb-4" style={{ color: 'rgba(245,234,225,0.5)' }}>
                  للردود الفورية والطلبات العاجلة، تواصل معنا مباشرة
                </p>
                <motion.a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm"
                  style={{ background: '#25d366', boxShadow: '0 0 20px rgba(37,211,102,0.25)' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(37,211,102,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  فتح واتس آب
                </motion.a>
              </div>

              {/* Working Hours */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,134,74,0.15)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(196,134,74,0.12)', border: '1px solid rgba(196,134,74,0.25)' }}>
                    <Clock size={18} style={{ color: '#d4a279' }} />
                  </div>
                  <h3 className="font-bold text-white">ساعات العمل</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { day: 'السبت — الخميس', time: '10:00 ص — 8:00 م', open: true },
                    { day: 'الجمعة', time: '2:00 م — 8:00 م', open: true },
                    { day: 'الأحد', time: 'مغلق', open: false },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2"
                      style={{ borderBottom: i < 2 ? '1px solid rgba(196,134,74,0.08)' : 'none' }}>
                      <span style={{ color: 'rgba(245,234,225,0.55)' }}>{item.day}</span>
                      <span style={{ color: item.open ? '#d4a279' : '#f87171', fontWeight: 600 }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="p-6 rounded-2xl overflow-hidden relative"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,134,74,0.15)', height: '160px' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <MapPin size={28} style={{ color: '#d4a279' }} />
                  <p className="text-sm font-semibold" style={{ color: '#d4a279' }}>دمياط الجديدة، مصر</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs underline transition-colors"
                    style={{ color: 'rgba(245,234,225,0.4)' }}
                    onMouseEnter={e => e.target.style.color = '#d4a279'}
                    onMouseLeave={e => e.target.style.color = 'rgba(245,234,225,0.4)'}
                  >
                    فتح في خرائط جوجل
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#0a0804', borderTop: '1px solid rgba(196,134,74,0.1)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
              style={{ background: 'rgba(180,114,63,0.1)', borderColor: 'rgba(212,162,121,0.3)', color: '#c48650' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              ✦ الأسئلة الشائعة
            </motion.span>
            <motion.h2
              className="text-4xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #f5eae1, #d4a279)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              أسئلة شائعة
            </motion.h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${expandedFAQ === idx ? 'rgba(196,134,74,0.45)' : 'rgba(196,134,74,0.12)'}`,
                  transition: 'border-color 0.3s',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? -1 : idx)}
                  className="w-full p-6 text-right flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-base text-white">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: expandedFAQ === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={20} style={{ color: '#c48650' }} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-7" style={{ color: 'rgba(245,234,225,0.6)' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
