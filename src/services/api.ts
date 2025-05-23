import axios from 'axios';

const API_BASE_URL = 'http://localhost:5006/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const productApi = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData: FormData) => {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProduct: async (id: string, productData: FormData) => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Review API calls
  addReview: async (productId: string, reviewData: { rating: number; comment: string }) => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  likeReview: async (productId: string, reviewId: string) => {
    const response = await api.post(`/products/${productId}/reviews/${reviewId}/like`);
    return response.data;
  },
}; 