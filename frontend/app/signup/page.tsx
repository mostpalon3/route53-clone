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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '60px'
      }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <SignupForm />
        </div>
      </div>
    </AppShell>
  );
}
