"use client";

import React from 'react';
import Button from '@cloudscape-design/components/button';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Button variant="normal" onClick={handleLogout}>
      Sign out
    </Button>
  );
}
