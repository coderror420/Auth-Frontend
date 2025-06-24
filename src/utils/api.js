import axios from 'axios';
import { getAccessToken , getRefreshToken } from './auth';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
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
      try {
        const refreshResponse = await axios.post('/refresh', {
          refreshToken: getRefreshToken()
        });

        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

   
        err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(err.config);
      } catch (refreshError) {

        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
