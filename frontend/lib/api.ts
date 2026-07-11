import axios from 'axios';
import { loadToken } from './auth';

export const api = axios.create({
  // Fall back to Render deployment if no NEXT_PUBLIC_API_URL is provided in environment variables
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://route53-backend-634e.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = loadToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // If we get a 401 Unauthorized, the token is invalid or expired
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      // Only redirect if we are not already on the login or signup page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
  }
  return Promise.reject(error);
});
