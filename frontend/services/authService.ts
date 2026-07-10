import { User } from '../types/auth';
import { saveToken, loadToken, removeToken } from '../lib/auth';
import { api } from '../lib/api';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/login', { email, password });
      const { access_token, user } = response.data;
      saveToken(access_token);
      return user;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Login failed');
    }
  },

  logout: async (): Promise<void> => {
    removeToken();
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = loadToken();
    if (!token) return null;
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user', error);
      removeToken();
      return null;
    }
  },

  saveToken: (token: string) => {
    saveToken(token);
  },

  clearSession: () => {
    removeToken();
  }
};
