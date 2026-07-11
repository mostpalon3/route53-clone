"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Header, 
  Tiles, 
  Button, 
  SpaceBetween, 
  BreadcrumbGroup, 
  ContentLayout,
  Box,
  Link
} from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';

export default function GetStartedPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('hosted-zones');

  const handleCancel = () => {
    router.push('/');
  };

  const handleGetStarted = () => {
    if (selectedOption === 'hosted-zones') {
      router.push('/hosted-zones/new');
    }
  };

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Get started', href: '#' }
          ]}
        />
      }
    >
      <ContentLayout
        header={
          <Header
            variant="h1"
            info={<Link variant="info">Info</Link>}
          >
            Get started
          </Header>
        }
      >
        <Container
          header={<Header variant="h2">Choose your starting point</Header>}
        >
          <Tiles
            onChange={({ detail }) => setSelectedOption(detail.value)}
            value={selectedOption}
            columns={3}
            items={[
              {
                label: "Register a domain",
                description: "Register the name, such as example.com, that your users use to access your application.",
                value: "domain",
                disabled: true
              },
              {
                label: "Transfer domain",
                description: "You can transfer domain names to Route 53 that you registered with another domain registrar.",
                value: "transfer",
                disabled: true
              },
              {
                label: "Create hosted zones",
                description: "A hosted zone tells Route 53 how to respond to DNS queries for a domain such as example.com.",
                value: "hosted-zones"
              },
              {
                label: "Configure health checks",
                description: "Health checks monitor your applications and web resources, and direct DNS queries to healthy resources.",
                value: "health-checks",
                disabled: true
              },
              {
                label: "Configure traffic flow",
                description: "A visual tool that lets you easily create policies for multiple endpoints in complex configurations.",
                value: "traffic-flow",
                disabled: true
              },
              {
                label: "Configure resolvers",
                description: "A regional service that lets you route DNS queries between your VPCs and your network.",
                value: "resolvers",
                disabled: true
              }
            ]}
          />
          <Box margin={{ top: 'l' }} float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" onClick={handleGetStarted} disabled={!selectedOption}>Get started</Button>
            </SpaceBetween>
          </Box>
        </Container>
      </ContentLayout>
    </AppShell>
  );
}
