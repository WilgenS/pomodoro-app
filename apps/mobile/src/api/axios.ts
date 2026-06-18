import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { CONFIG } from '../constants/config';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Inject Access Token
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle expired tokens & retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid loops on refresh token calls
    if (error.response?.status === 401 && originalRequest.url === '/auth/refresh') {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;
      if (!refreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        // We use our custom Authorization Bearer format for refresh tokens in the mobile client
        axios
          .post(`${CONFIG.API_URL}/auth/refresh`, {}, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          })
          .then((res) => {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

            // We get the current user metadata or fetch it if needed, but since we are just updating tokens:
            const user = useAuthStore.getState().user;
            if (user) {
              useAuthStore.getState().setAuth(user, newAccessToken, newRefreshToken);
            } else {
              useAuthStore.getState().setAccessToken(newAccessToken);
            }

            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            useAuthStore.getState().logout();
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
