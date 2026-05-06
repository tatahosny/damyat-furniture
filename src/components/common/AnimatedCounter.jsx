import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks'
import { useRef, useState, useEffect } from 'react'

const AnimatedCounter = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isVisible = useIntersectionObserver(ref)

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const increment = value / (duration * 60)

    const counter = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(counter)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)

    return () => clearInterval(counter)
  }, [isVisible, value, duration])

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        {prefix}
        {count.toLocaleString('ar-EG')}
        {suffix}
      </motion.span>
    </div>
  )
}

export default AnimatedCounter
