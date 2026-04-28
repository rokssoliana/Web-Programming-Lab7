import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const inventoryApi = {
  getAll: () => axios.get(`${API_URL}/inventory`),
  create: (formData) => axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => axios.delete(`${API_URL}/inventory/${id}`)
};