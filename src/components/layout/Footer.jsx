import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'الشركة',
      links: [
        { name: 'عن دمياط', href: '#' },
        { name: 'المدونة', href: '#' },
        { name: 'الوظائف', href: '#' },
        { name: 'تواصل معنا', href: '/contact' },
      ],
    },
    {
      title: 'المنتجات',
      links: [
        { name: 'غرف النوم', href: '/products' },
        { name: 'غرف الجلوس', href: '/rooms' },
        { name: 'طاولات الطعام', href: '/products' },
        { name: 'العروض الحصرية', href: '#' },
      ],
    },
    {
      title: 'الدعم',
      links: [
        { name: 'سياسة الخصوصية', href: '#' },
        { name: 'شروط الاستخدام', href: '#' },
        { name: 'سياسة الإرجاع', href: '#' },
        { name: 'شحن وتوصيل', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: '#1877f2' },
    { name: 'Instagram', icon: Instagram, href: '#', color: '#e1306c' },
    { name: 'Twitter', icon: Twitter, href: '#', color: '#1da1f2' },
    { name: 'Youtube', icon: Youtube, href: '#', color: '#ff0000' },
  ]

  const contactInfo = [
    { icon: Phone, text: '+20 123 456 7890', href: 'tel:+201234567890' },
    { icon: Mail, text: 'info@damyat-furniture.com', href: 'mailto:info@damyat-furniture.com' },
    { icon: MapPin, text: 'دمياط الجديدة، مصر', href: '#' },
  ]

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #080604 0%, #0a0804 60%, #050403 100%)',
        borderTop: '1px solid rgba(196,134,74,0.2)',
      }}
    >
      {/* Top decorative bar */}
      <div className="w-full h-[2px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(196,134,74,0.6) 30%, rgba(234,132,90,0.8) 50%, rgba(196,134,74,0.6) 70%, transparent)',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20 H50 C75 20 90 35 90 50 C90 65 75 80 50 80 H20 V20 Z"
                  stroke="url(#footerGold)" strokeWidth="6" fill="transparent" />
                <path d="M35 35 H50 C60 35 68 42 68 50 C68 58 60 65 50 65 H35 V35 Z" fill="url(#footerGold)" />
                <defs>
                  <linearGradient id="footerGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f5eae1" />
                    <stop offset="50%" stopColor="#d4a279" />
                    <stop offset="100%" stopColor="#9d5f35" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <h3 className="font-bold text-xl leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #f5eae1, #d4a279)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >دمياط</h3>
                <p className="text-xs tracking-widest mt-0.5" style={{ color: 'rgba(196,134,74,0.6)' }}>FURNITURE</p>
              </div>
            </div>

            <p className="text-sm leading-7 mb-6" style={{ color: 'rgba(245,234,225,0.5)' }}>
              منذ أكثر من 15 عامًا، نقدم لك أفضل تشكيلة من الأثاث الفاخر بتصاميم عصرية وجودة استثنائية لا مثيل لها.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(196,134,74,0.2)',
                    color: 'rgba(245,234,225,0.6)',
                  }}
                  whileHover={{
                    scale: 1.15,
                    color: social.color,
                    borderColor: social.color,
                    background: `${social.color}15`,
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
            >
              <h4 className="font-semibold text-base mb-5"
                style={{ color: '#d4a279' }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm transition-all duration-300 flex items-center gap-2 group"
                      style={{ color: 'rgba(245,234,225,0.45)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a279' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,234,225,0.45)' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact + Newsletter */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10"
          style={{ borderTop: '1px solid rgba(196,134,74,0.12)' }}
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="font-semibold text-base mb-5" style={{ color: '#d4a279' }}>
              معلومات التواصل
            </h4>
            <div className="space-y-4">
              {contactInfo.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-3 text-sm transition-all duration-300 group"
                  style={{ color: 'rgba(245,234,225,0.5)' }}
                  whileHover={{ color: '#d4a279', x: -4 }}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: 'rgba(196,134,74,0.1)', border: '1px solid rgba(196,134,74,0.2)' }}
                  >
                    <item.icon size={16} style={{ color: '#c48650' }} />
                  </span>
                  {item.text}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-base mb-2" style={{ color: '#d4a279' }}>
              النشرة البريدية
            </h4>
            <p className="text-sm mb-5" style={{ color: 'rgba(245,234,225,0.4)' }}>
              اشترك لتصلك أحدث العروض والتصاميم
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني..."
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(196,134,74,0.2)',
                  color: 'rgba(245,234,225,0.9)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(196,134,74,0.6)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(196,134,74,0.2)' }}
              />
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #c48650, #ea845a)',
                  boxShadow: '0 0 20px rgba(196,134,74,0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(196,134,74,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                اشترك
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{
            borderTop: '1px solid rgba(196,134,74,0.1)',
            color: 'rgba(245,234,225,0.3)',
          }}
        >
          <p>© {currentYear} دمياط للأثاث. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>صُنع بـ</span>
            <span style={{ color: '#c48650' }}>♥</span>
            <span>في دمياط، مصر</span>
          </div>
          <div className="flex gap-5">
            {['سياسة الخصوصية', 'الشروط والأحكام'].map((item) => (
              <a key={item} href="#"
                className="transition-colors duration-300 hover:text-primary-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
