import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getProducts = async (categoryId = null) => {
  const params = categoryId ? { category_id: categoryId } : {};
  const response = await api.get('/products', { params });
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const submitMessage = async (messageData) => {
  const response = await api.post('/messages', messageData);
  return response.data;
};

export default api;
