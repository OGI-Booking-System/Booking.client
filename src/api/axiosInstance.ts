import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';
import { storage } from '../lib/storage';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = storage.getRefreshToken();

      if (refreshToken) {
        try {
          const response = await axios.post<{ data: { accessToken: string } }>(
            `${API_BASE_URL}/api/auth/refresh-token`,
            { refreshToken },
          );
          const newAccessToken = response.data.data.accessToken;
          storage.setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch {
          storage.clearAll();
          window.location.href = '/login';
        }
      } else {
        storage.clearAll();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
