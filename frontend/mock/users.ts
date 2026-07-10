import { User } from '../types/auth';

export const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'password123',
    name: 'Standard User',
    role: 'user',
  }
];
