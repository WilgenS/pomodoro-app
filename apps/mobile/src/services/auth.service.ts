import api from '../api/axios';
import { User } from '../store/auth.store';

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const AuthService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  register: async (email: string, name: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, name });
    return response.data;
  },

  login: async (email: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
