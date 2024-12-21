import api from './api';

const profileService = {
  async updateProfile(userData) {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  async updatePassword(currentPassword, newPassword) {
    const response = await api.put('/users/password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  async updateNotifications(settings) {
    const response = await api.put('/users/notifications', settings);
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getBillingInfo() {
    const response = await api.get('/users/billing');
    return response.data;
  },

  async updateBillingInfo(billingData) {
    const response = await api.put('/users/billing', billingData);
    return response.data;
  }
};

export default profileService; 