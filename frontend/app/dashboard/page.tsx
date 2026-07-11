"use client";

import React from 'react';
import { SpaceBetween, ContentLayout, Header, BreadcrumbGroup } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardFeatures } from '@/components/dashboard/DashboardFeatures';
import { RegisterDomain } from '@/components/dashboard/RegisterDomain';
import { Notifications } from '@/components/dashboard/Notifications';
import { Resources } from '@/components/dashboard/Resources';
import { Footer } from '@/components/dashboard/Footer';

export default function DashboardPage() {
  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Dashboard', href: '#' }
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <ContentLayout
        header={
          <Header variant="h1" info={<a href="#">Info</a>}>
            Route 53 Dashboard
          </Header>
        }
      >
        <SpaceBetween size="l">
          <DashboardFeatures />
          <RegisterDomain />
          <Notifications />
          <Resources />
        </SpaceBetween>
      </ContentLayout>
      <Footer />
    </AppShell>
  );
}
