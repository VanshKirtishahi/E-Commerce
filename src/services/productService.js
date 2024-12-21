import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  createProduct: async (productData) => {
    // TODO: Replace with actual API call
    return {
      id: Date.now().toString(),
      ...productData,
      rating: 0,
      reviews: []
    };
  },

  updateProduct: async (id, productData) => {
    // TODO: Replace with actual API call
    return {
      id,
      ...productData
    };
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  addReview: async (productId, review) => {
    // TODO: Replace with actual API call
    return {
      id: Date.now().toString(),
      ...review,
      date: new Date()
    };
  }
}; 