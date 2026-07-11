"use client";

import React from 'react';
import { ContentLayout, Header, Container, Box, BreadcrumbGroup } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';

export default function ComingSoonPage() {
  return (
    <AppShell breadcrumbs={<BreadcrumbGroup items={[{ text: 'Route 53', href: '/' }, { text: 'Coming Soon', href: '#' }]} />}>
      <ContentLayout
        header={
          <Header variant="h1" description="This feature is currently under development.">
            Coming Soon
          </Header>
        }
      >
        <Container>
          <Box textAlign="center" padding="xxl" color="text-body-secondary">
            <Box variant="h2" padding={{ bottom: 's' }}>
              We're building this feature
            </Box>
            <p>This section of the Route 53 clone is currently under construction. Please check back later.</p>
          </Box>
        </Container>
      </ContentLayout>
    </AppShell>
  );
}
