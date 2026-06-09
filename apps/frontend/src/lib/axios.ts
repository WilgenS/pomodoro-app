import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// Helper to manage concurrent refresh requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle unauthorized responses (e.g., token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;
    const { user } = useAuthStore.getState();

    // If no user is logged in, we shouldn't attempt to refresh or handle 401s here
    // But we should still reject the promise so the caller knows it failed
    if (!user) {
      return Promise.reject(error);
    }

    // 1. Prevent infinite loops if the refresh call itself fails
    if (error.response?.status === 401 && originalRequest.url === '/auth/refresh') {
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 2. Handle 401 errors for other requests
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request if a refresh is already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Attempt to refresh the token
      return new Promise((resolve, reject) => {
        api
          .post('/auth/refresh')
          .then(() => {
            processQueue(null);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err);
            // If refresh fails, clear auth state and redirect to login
            useAuthStore.getState().logout();
            window.location.href = '/login';
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
