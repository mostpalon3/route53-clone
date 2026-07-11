"use client";

import React from 'react';
import { SignupForm } from '@/components/auth/SignupForm';
import { BreadcrumbGroup } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';

export default function SignupPage() {
  return (
    <AppShell 
      breadcrumbs={<BreadcrumbGroup items={[{ text: 'Route 53', href: '/' }, { text: 'Sign up', href: '#' }]} />}
    >
      <div className="flex justify-center pt-[60px]">
        <div className="w-full max-w-[500px] px-4">
          <SignupForm />
        </div>
      </div>
    </AppShell>
  );
}
