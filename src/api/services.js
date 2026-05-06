import apiClient from './client'

// Products API
export const productsAPI = {
  getAll: (params) => apiClient.get('/products', { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  getByRoom: (roomId, params) => apiClient.get(`/products/room/${roomId}`, { params }),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
  search: (query) => apiClient.get('/products/search', { params: { q: query } }),
  getReviews: (productId) => apiClient.get(`/products/${productId}/reviews`),
}

// Rooms API
export const roomsAPI = {
  getAll: () => apiClient.get('/rooms'),
  getById: (id) => apiClient.get(`/rooms/${id}`),
  create: (data) => apiClient.post('/rooms', data),
  update: (id, data) => apiClient.put(`/rooms/${id}`, data),
  delete: (id) => apiClient.delete(`/rooms/${id}`),
}

// Categories API
export const categoriesAPI = {
  getAll: () => apiClient.get('/categories'),
  getById: (id) => apiClient.get(`/categories/${id}`),
}

// Orders API
export const ordersAPI = {
  create: (data) => apiClient.post('/orders', data),
  getAll: (params) => apiClient.get('/orders', { params }),
  getById: (id) => apiClient.get(`/orders/${id}`),
  update: (id, data) => apiClient.put(`/orders/${id}`, data),
  cancel: (id) => apiClient.post(`/orders/${id}/cancel`),
  getMyOrders: () => apiClient.get('/orders/me'),
}

// Custom Furniture API
export const customFurnitureAPI = {
  create: (data) => apiClient.post('/custom-furniture', data),
  getAll: () => apiClient.get('/custom-furniture'),
  getById: (id) => apiClient.get(`/custom-furniture/${id}`),
  update: (id, data) => apiClient.put(`/custom-furniture/${id}`, data),
  delete: (id) => apiClient.delete(`/custom-furniture/${id}`),
}

// Customers API
export const customersAPI = {
  create: (data) => apiClient.post('/customers', data),
  getProfile: () => apiClient.get('/customers/me'),
  update: (data) => apiClient.put('/customers/me', data),
  getAddresses: () => apiClient.get('/customers/me/addresses'),
  addAddress: (data) => apiClient.post('/customers/me/addresses', data),
  updateAddress: (id, data) => apiClient.put(`/customers/me/addresses/${id}`, data),
}

// Reviews API
export const reviewsAPI = {
  create: (data) => apiClient.post('/reviews', data),
  getAll: (params) => apiClient.get('/reviews', { params }),
  getByProduct: (productId) => apiClient.get(`/reviews/product/${productId}`),
  update: (id, data) => apiClient.put(`/reviews/${id}`, data),
  delete: (id) => apiClient.delete(`/reviews/${id}`),
}

// Contact API
export const contactAPI = {
  submitMessage: (data) => apiClient.post('/contact', data),
}

// Authentication API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  verifyEmail: (token) => apiClient.post(`/auth/verify-email/${token}`),
  resetPassword: (email) => apiClient.post('/auth/reset-password', { email }),
  updatePassword: (data) => apiClient.post('/auth/update-password', data),
}
