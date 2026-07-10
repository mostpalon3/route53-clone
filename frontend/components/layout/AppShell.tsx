"use client";

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@cloudscape-design/components';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import '@cloudscape-design/global-styles/index.css';

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const [navigationOpen, setNavigationOpen] = useState(true);

  // Remember collapsed state using localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('route53-sidebar-open');
    if (savedState !== null) {
      setNavigationOpen(savedState === 'true');
    }
  }, []);

  const handleNavigationChange = (e: any) => {
    setNavigationOpen(e.detail.open);
    localStorage.setItem('route53-sidebar-open', String(e.detail.open));
  };

  return (
    <>
      <div id="top-nav" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <TopNav />
      </div>
      <div style={{ paddingBottom: '40px' }}>
        <AppLayout
          navigationOpen={navigationOpen}
          onNavigationChange={handleNavigationChange}
          navigation={<Sidebar />}
          breadcrumbs={breadcrumbs}
          content={children}
          toolsHide={true}
          headerSelector="#top-nav"
        />
      </div>
      <Footer />
    </>
  );
}
