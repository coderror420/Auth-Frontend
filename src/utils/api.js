import axios from 'axios';
import { getAccessToken } from './auth';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, 
});
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401 && getRefreshToken()) {
    }
    return Promise.reject(err);
  }
);

export default api;
