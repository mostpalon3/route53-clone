"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';
import { authService } from '../services/authService';

import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else if (pathname !== '/login' && pathname !== '/signup') {
        router.push('/login');
      }
      setLoading(false);
    };
    checkSession();
  }, [pathname, router]);

  const login = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const signup = async (username: string, email: string, password: string) => {
    const newUser = await authService.signup(username, email, password);
    setUser(newUser);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
