import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useState, useRef, useEffect } from 'react'
import HeroSection from '../components/home/HeroSection'
import { Section, Container, Button } from '../components/common/UIComponents'
import AnimatedCounter from '../components/common/AnimatedCounter'
import ProductCard from '../components/products/ProductCard'
import RoomCard from '../components/rooms/RoomCard'
import { ROOM_TYPES } from '../utils/constants'
import { Link } from 'react-router-dom'
import { Star, Truck, Shield, Zap, Award, ChevronLeft, Quote, Loader2 } from 'lucide-react'
import { getProducts } from '../services/api'

// ─── Section Title Component ──────────────────────────────────────────────────
const SectionTitle = ({ badge, title, subtitle }) => (
  <div className="mb-16 text-center">
    {badge && (
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
        style={{
          background: 'rgba(180,114,63,0.1)',
          borderColor: 'rgba(212,162,121,0.3)',
          color: '#c48650',
        }}
      >
        {badge}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
      style={{
        background: 'linear-gradient(135deg, #f5eae1 0%, #d4a279 50%, #9d5f35 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    )}
    <div className="flex items-center justify-center gap-3 mt-5">
      <div className="h-[1px] w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(196,134,74,0.6))' }} />
      <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(196,134,74,0.7)]" />
      <div className="h-[1px] w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(196,134,74,0.6))' }} />
    </div>
  </div>
)

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        // Map image_url to image and limit to 4 products for home
        const mappedData = data.slice(0, 4).map(p => ({
          ...p,
          image: p.image_url,
          rating: parseFloat(p.rating),
          price: parseFloat(p.price)
        }))
        setProducts(mappedData)
      } catch (err) {
        console.error('Error fetching featured products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مهندس معماري',
      rating: 5,
      text: 'تجربة رائعة جداً، الأثاث فاخر والخدمة ممتازة. نوعية الخشب المستخدمة تفوق كل التوقعات.',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    {
      name: 'فاطمة علي',
      role: 'مصممة ديكور داخلي',
      rating: 5,
      text: 'منتجات عالية الجودة وأسعار منافسة، أنصح الجميع بالتعامل مع دمياط للأثاث.',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      name: 'محمد حسن',
      role: 'رجل أعمال',
      rating: 5,
      text: 'الشحن كان سريع والتغليف ممتاز. الأثاث بالضبط كما هو في الصور، راضٍ تمامًا.',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  ]

  const features = [
    {
      icon: Shield,
      title: 'ضمان 5 سنوات',
      description: 'ضمان شامل على جميع المنتجات',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Truck,
      title: 'توصيل مجاني',
      description: 'توصيل مجاني لجميع أنحاء مصر',
      color: 'from-primary-500 to-secondary-600',
    },
    {
      icon: Zap,
      title: 'تصنيع سريع',
      description: 'تصنيع وتسليم في أسرع وقت',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Award,
      title: 'جودة عالية',
      description: 'أفضل المواد والتشطيبات الفاخرة',
      color: 'from-rose-500 to-red-600',
    },
  ]

  const stats = [
    { label: 'عميل راضي', value: 5000, suffix: '+' },
    { label: 'منتج متاح', value: 150, suffix: '+' },
    { label: 'سنة خبرة', value: 15, suffix: '' },
    { label: 'مشروع منجز', value: 10000, suffix: '+' },
  ]

  return (
    <>
      <Helmet>
        <title>دمياط للأثاث - أثاث فاخر عصري</title>
        <meta name="description" content="استكشف أجمل تشكيلة من الأثاث الفاخر والعصري بأسعار منافسة - دمياط للأثاث" />
        <meta name="keywords" content="أثاث، أثاث فاخر، أثاث عصري، غرف نوم، أرائك، دمياط" />
        <meta property="og:title" content="دمياط للأثاث" />
        <meta property="og:description" content="أثاث فاخر بتصميم عصري" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection
        title="دمياط للأثاث"
        subtitle="حيث تلتقي الفخامة بالراحة — اكتشف عالماً من الأثاث العصري الراقي المصنوع بأيدٍ مبدعة"
        backgroundImage="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1800&auto=format&fit=crop"
        ctaLabel="استكشف التشكيلة الحصرية"
        ctaLink="/products"
      />

      {/* ─── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0a0804 0%, #0d0a06 100%)' }}>
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(196,134,74,1) 0%, transparent 70%)' }} />
        </div>
        <Container>
          <SectionTitle
            badge="✦ أفضل المنتجات"
            title="المنتجات المختارة"
            subtitle="مجموعة مختارة بعناية من أرقى قطع الأثاث"
          />
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin text-[#d4a279] mb-4" size={40} />
              <p className="text-gray-500">جاري تحميل المنتجات...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/products">
              <Button size="lg">
                عرض جميع المنتجات
                <ChevronLeft size={18} className="inline mr-2" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ─── Featured Rooms ────────────────────────────────────────────────── */}
      <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0d0a06 0%, #120d08 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-5"
            style={{ background: 'radial-gradient(ellipse, rgba(234,132,90,1) 0%, transparent 70%)' }} />
        </div>
        <Container>
          <SectionTitle
            badge="✦ كل ما تحتاجه"
            title="غرف مختارة"
            subtitle="استكشف أجمل تصاميم الغرف المختلفة بأسلوب راقٍ يعكس ذوقك"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_TYPES.slice(0, 9).map((room, idx) => (
              <RoomCard
                key={room.id}
                room={{
                  id: room.id,
                  name: room.name,
                  description: room.description,
                  image: room.image,
                  startingPrice: [5500, 4200, 6800, 3900, 7500, 8200, 4100, 9600, 5000][idx] || 5000,
                }}
                index={idx}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Features / Why Us ────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #120d08 0%, #0a0804 100%)' }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(196,134,74,0.5) 0px, rgba(196,134,74,0.5) 1px, transparent 1px, transparent 40px)',
          }} />
        </div>
        <Container>
          <SectionTitle
            badge="✦ لماذا دمياط"
            title="تميزنا يتحدث"
            subtitle="نقدم لك تجربة متكاملة تجمع بين الجودة والفخامة والخدمة الاستثنائية"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative text-center p-8 rounded-2xl border transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(196,134,74,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196,134,74,0.5)'
                  e.currentTarget.style.background = 'rgba(180,114,63,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196,134,74,0.15)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  style={{ boxShadow: '0 10px 30px rgba(196,134,74,0.25)' }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon size={36} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Statistics ───────────────────────────────────────────────────── */}
      <section className="py-24 relative" style={{
        background: 'linear-gradient(135deg, #1a0e05 0%, #0d0804 50%, #160b04 100%)',
        borderTop: '1px solid rgba(196,134,74,0.15)',
        borderBottom: '1px solid rgba(196,134,74,0.15)',
      }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(196,134,74,0.3) 0%, transparent 70%)' }} />
        </div>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 120 }}
              >
                <div className="relative inline-block">
                  <div className="text-5xl md:text-6xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(135deg, #f5eae1 0%, #d4a279 50%, #c48650 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="absolute -inset-4 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, rgba(196,134,74,1) 0%, transparent 70%)' }} />
                </div>
                <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0a0804 0%, #0d0a06 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] opacity-5"
            style={{ background: 'radial-gradient(ellipse, rgba(196,134,74,1) 0%, transparent 70%)' }} />
        </div>
        <Container>
          <SectionTitle
            badge="✦ ثقة عملائنا"
            title="آراء عملائنا"
            subtitle="أكثر من 5000 عميل وثقوا بنا — هذا ما يقولونه"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative p-8 rounded-2xl border transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(196,134,74,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Quote icon */}
                <Quote size={36} className="mb-4 opacity-30" style={{ color: '#c48650' }} />

                <p className="text-gray-300 mb-6 leading-relaxed text-base italic">"{testimonial.text}"</p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2"
                    style={{ borderColor: 'rgba(196,134,74,0.5)' }}
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="flex mr-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(196,134,74,0.08) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Rich dark background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #1a0a03 0%, #2a1208 30%, #1f0e06 60%, #150904 100%)',
        }} />
        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(196,134,74,1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(234,132,90,1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Gold lines pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(196,134,74,0.4) 60px, rgba(196,134,74,0.4) 61px)',
        }} />

        <Container className="relative">
          <motion.div
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 border"
              style={{
                background: 'rgba(180,114,63,0.15)',
                borderColor: 'rgba(212,162,121,0.4)',
                color: '#d4a279',
              }}
            >
              ✦ ابدأ رحلتك معنا
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5eae1 30%, #d4a279 60%, #c48650 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              أثاث أحلامك ينتظرك
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(245,234,225,0.75)' }}>
              ابدأ رحلتك معنا اليوم واستمتع بتجربة تسوق فريدة — نصنع ما يعكس شخصيتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <motion.button
                  className="px-10 py-4 rounded-full font-bold text-lg text-white"
                  style={{
                    background: 'linear-gradient(135deg, #c48650, #ea845a)',
                    boxShadow: '0 0 40px rgba(196,134,74,0.4)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(196,134,74,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  استكشف المنتجات
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  className="px-10 py-4 rounded-full font-bold text-lg border-2"
                  style={{
                    borderColor: 'rgba(212,162,121,0.6)',
                    color: '#d4a279',
                    background: 'rgba(180,114,63,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ scale: 1.05, background: 'rgba(180,114,63,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  تواصل معنا
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}

export default Home
