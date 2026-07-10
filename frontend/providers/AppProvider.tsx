"use client";

import React, { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
