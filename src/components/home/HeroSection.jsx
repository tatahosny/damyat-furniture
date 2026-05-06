import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, ArrowLeft } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HeroSection = ({ title, subtitle, backgroundImage, ctaLabel, ctaLink, hasScroll = true }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }))
    setParticles(generated)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.4 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* === Parallax Background === */}
      <motion.div
        className="absolute inset-0"
        style={{ y: yBg, zIndex: 0 }}
      >
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.1)' }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* === Multi-layer Gradient Overlays === */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {/* Deep dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        {/* Warm amber glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(180,100,30,0.25),transparent)]" />
        {/* Left warm accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_20%_50%,rgba(200,120,40,0.15),transparent)]" />
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom strong vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      </div>

      {/* === Floating Gold Particles === */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2, pointerEvents: 'none' }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: 'radial-gradient(circle, rgba(212,162,121,0.9) 0%, rgba(180,114,63,0.4) 100%)',
              boxShadow: '0 0 6px rgba(212,162,121,0.6)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* === Decorative Lines === */}
      <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: 'none' }}>
        {/* Horizontal accent lines */}
        <motion.div
          className="absolute top-1/3 left-0 h-[1px] w-1/4"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,162,121,0.5), transparent)' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-0 h-[1px] w-1/4"
          style={{ background: 'linear-gradient(to left, transparent, rgba(212,162,121,0.5), transparent)' }}
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* === Main Content === */}
      <motion.div
        className="relative flex flex-col items-center justify-center text-center text-white max-w-5xl mx-auto px-6"
        style={{ zIndex: 10, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border"
            style={{
              background: 'rgba(180,114,63,0.15)',
              borderColor: 'rgba(212,162,121,0.4)',
              color: '#d4a279',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles size={12} />
            أثاث فاخر • صنع في دمياط
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'Cairo, serif' }}
          variants={itemVariants}
        >
          <span style={{
            background: 'linear-gradient(135deg, #f5eae1 0%, #d4a279 40%, #c48650 70%, #9d5f35 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 20px rgba(180,114,63,0.4))',
          }}>
            {title}
          </span>
        </motion.h1>

        {/* Decorative divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary-400" />
          <div className="w-2 h-2 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(196,134,74,0.8)]" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary-400" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed"
          style={{ color: 'rgba(245,234,225,0.85)' }}
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center">
          {ctaLabel && (
            <Link to={ctaLink || '/products'}>
              <motion.button
                className="relative px-10 py-4 rounded-full font-bold text-lg overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #c48650, #ea845a)',
                  boxShadow: '0 0 30px rgba(196,134,74,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  color: 'white',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(196,134,74,0.6), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaLabel}
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #ea845a, #c48650)' }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          )}
          <Link to="/rooms">
            <motion.button
              className="px-10 py-4 rounded-full font-bold text-lg border-2"
              style={{
                borderColor: 'rgba(212,162,121,0.6)',
                color: '#d4a279',
                background: 'rgba(180,114,63,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{
                scale: 1.05,
                background: 'rgba(180,114,63,0.2)',
                borderColor: 'rgba(212,162,121,0.9)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              استكشف الغرف
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center gap-8 sm:gap-16"
        >
          {[
            { value: '5000+', label: 'عميل سعيد' },
            { value: '15', label: 'سنة خبرة' },
            { value: '150+', label: 'تصميم فريد' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#d4a279' }}>{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(245,234,225,0.6)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* === Scroll Indicator === */}
      {hasScroll && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(212,162,121,0.7)' }}>scroll</span>
          <motion.div
            className="w-[1px] h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(212,162,121,0.8), transparent)' }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-4 h-4 rounded-full border-2"
            style={{ borderColor: 'rgba(212,162,121,0.5)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  )
}

export default HeroSection
