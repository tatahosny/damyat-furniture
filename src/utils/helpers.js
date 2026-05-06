// Format price for display
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
  }).format(price)
}

// Calculate discounted price
export const calculateDiscount = (originalPrice, discountPercent) => {
  return originalPrice * (1 - discountPercent / 100)
}

// Calculate dynamic furniture pricing based on size
export const calculateDynamicPrice = (basePrice, sizeMultiplier, customDimensions = null) => {
  let price = basePrice * sizeMultiplier
  
  if (customDimensions) {
    const dimensionFactor = (customDimensions.width * customDimensions.height) / (200 * 150)
    price *= dimensionFactor
  }
  
  return Math.round(price)
}

// Estimate manufacturing time (in days)
export const estimateManufacturingTime = (complexity = 1, quantityOrdered = 1) => {
  const baseTime = 7
  const complexityDays = complexity * 3
  const quantityDays = Math.ceil(quantityOrdered / 5) * 2
  
  return baseTime + complexityDays + quantityDays
}

// Generate product slug
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Get stars array for rating
export const getStarArray = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 'full' : 'empty')
}

// Calculate average rating
export const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.length).toFixed(1)
}

// Format date
export const formatDate = (date, locale = 'ar-EG') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format time
export const formatTime = (date, locale = 'ar-EG') => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Check if product is in stock
export const isInStock = (stock) => stock > 0

// Get stock status
export const getStockStatus = (stock) => {
  if (stock === 0) return { status: 'out-of-stock', text: 'غير متاح', color: 'red' }
  if (stock < 5) return { status: 'low-stock', text: 'كمية محدودة', color: 'yellow' }
  return { status: 'in-stock', text: 'متاح', color: 'green' }
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Local storage helpers
export const storage = {
  getItem: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Storage error:', e)
    }
  },
  removeItem: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
}
