import { User } from '../types/auth';
import { saveToken, loadToken, removeToken } from '../lib/auth';
import { api } from '../lib/api';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      // response.data is the APIResponse standard envelope
      const { access_token, user } = response.data.data;
      saveToken(access_token);
      return user;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as any;
        if (err.response && err.response.data && err.response.data.detail) {
          throw new Error(err.response.data.detail);
        }
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
      const response = await api.get('/api/auth/me');
      return response.data.data;
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
