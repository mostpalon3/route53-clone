import { MOCK_USERS } from '../mock/users';
import { User } from '../types/auth';
import { saveSession, loadSession, removeSession } from '../lib/auth';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _password, ...userWithoutPassword } = user;
    saveSession(userWithoutPassword);
    
    return userWithoutPassword;
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    removeSession();
  },

  getCurrentUser: (): User | null => {
    return loadSession();
  },

  saveSession: (user: User) => {
    saveSession(user);
  },

  clearSession: () => {
    removeSession();
  }
};
