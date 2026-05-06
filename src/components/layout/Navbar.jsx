import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, Moon, Sun, ShoppingCart, Heart, Search } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useCartStore } from '../../store/cartStore'
import { useClickOutside } from '../../hooks'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useThemeStore()
  const cartItems = useCartStore((state) => state.getTotalItems())
  const menuRef = useRef(null)
  const location = useLocation()

  useClickOutside(menuRef, () => setIsOpen(false))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'الرئيسية', nameEn: 'Home', path: '/' },
    { name: 'الغرف', nameEn: 'Rooms', path: '/rooms' },
    { name: 'المنتجات', nameEn: 'Products', path: '/products' },
    { name: 'تواصل معنا', nameEn: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10, 8, 4, 0.92)'
          : 'rgba(5, 4, 2, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(196,134,74,0.25)'
          : '1px solid rgba(196,134,74,0.08)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg">
                <path d="M20 20 H50 C75 20 90 35 90 50 C90 65 75 80 50 80 H20 V20 Z"
                  stroke="url(#goldGrad)" strokeWidth="6" fill="transparent" />
                <path d="M35 35 H50 C60 35 68 42 68 50 C68 58 60 65 50 65 H35 V35 Z" fill="url(#goldGrad)" />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f5eae1" />
                    <stop offset="40%" stopColor="#d4a279" />
                    <stop offset="100%" stopColor="#9d5f35" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Glow effect on logo */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle, rgba(196,134,74,0.3) 0%, transparent 70%)' }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl leading-none"
                style={{
                  background: 'linear-gradient(135deg, #f5eae1 0%, #d4a279 60%, #9d5f35 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                دمياط
              </h1>
              <p className="text-xs tracking-widest" style={{ color: 'rgba(196,134,74,0.7)' }}>FURNITURE</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                style={{
                  color: isActive(link.path) ? '#d4a279' : 'rgba(245,234,225,0.75)',
                }}
              >
                {link.name}
                {/* Active / hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                  style={{ background: 'linear-gradient(to right, #c48650, #ea845a)' }}
                  initial={false}
                  animate={{ width: isActive(link.path) ? '60%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:bg-white/5 opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="ابحث..."
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                    className="w-full px-4 py-2 rounded-lg text-sm outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(196,134,74,0.4)',
                      color: 'rgba(245,234,225,0.9)',
                    }}
                  />
                </motion.div>
              ) : (
                <motion.button
                  key="search-btn"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{ color: 'rgba(245,234,225,0.7)' }}
                  whileHover={{ color: '#d4a279', background: 'rgba(196,134,74,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300"
              style={{ color: 'rgba(245,234,225,0.7)' }}
              whileHover={{ color: '#d4a279', background: 'rgba(196,134,74,0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Favorites */}
            <motion.button
              className="p-2 rounded-lg transition-all duration-300"
              style={{ color: 'rgba(245,234,225,0.7)' }}
              whileHover={{ color: '#e05c5c', background: 'rgba(220,50,50,0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} />
            </motion.button>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <motion.div
                className="p-2 rounded-lg transition-all duration-300"
                style={{ color: 'rgba(245,234,225,0.7)' }}
                whileHover={{ color: '#d4a279', background: 'rgba(196,134,74,0.1)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart size={20} />
              </motion.div>
              {cartItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #c48650, #ea845a)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {cartItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'rgba(245,234,225,0.8)' }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}><X size={24} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }}><Menu size={24} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(196,134,74,0.15)' }}
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                      style={{
                        color: isActive(link.path) ? '#d4a279' : 'rgba(245,234,225,0.75)',
                        background: isActive(link.path) ? 'rgba(196,134,74,0.1)' : 'transparent',
                        borderLeft: isActive(link.path) ? '3px solid #c48650' : '3px solid transparent',
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
