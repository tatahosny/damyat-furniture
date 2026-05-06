import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Package, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#080604' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,134,74,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(234,132,90,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Gold particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: 'rgba(212,162,121,0.7)',
            boxShadow: '0 0 4px rgba(212,162,121,0.5)',
          }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(196,134,74,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,134,74,0.8) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 404 Number */}
          <motion.div
            className="text-[10rem] sm:text-[14rem] font-black leading-none mb-0 select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(245,234,225,0.08) 0%, rgba(196,134,74,0.25) 50%, rgba(245,234,225,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 40px rgba(196,134,74,0.2))',
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            404
          </motion.div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8 -mt-4">
            <div className="h-[1px] w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(196,134,74,0.5))' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(196,134,74,0.7)' }}>
              الصفحة غير موجودة
            </span>
            <div className="h-[1px] w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(196,134,74,0.5))' }} />
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            هذه الصفحة لا وجود لها
          </motion.h1>

          <motion.p
            className="text-base mb-10 leading-relaxed max-w-md mx-auto"
            style={{ color: 'rgba(245,234,225,0.5)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            يبدو أن الصفحة التي تبحث عنها قد نُقلت أو حُذفت. لا تقلق، لا يزال أمامك عالم من الأثاث الفاخر!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          >
            <Link to="/">
              <motion.button
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #c48650, #ea845a)',
                  boxShadow: '0 0 30px rgba(196,134,74,0.35)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(196,134,74,0.55)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Home size={18} />
                الصفحة الرئيسية
              </motion.button>
            </Link>

            <Link to="/products">
              <motion.button
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold border-2"
                style={{
                  borderColor: 'rgba(212,162,121,0.5)',
                  color: '#d4a279',
                  background: 'rgba(180,114,63,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.05, background: 'rgba(180,114,63,0.18)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Package size={18} />
                استكشف المنتجات
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound
