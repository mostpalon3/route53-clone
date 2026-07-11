"use client";

import React from 'react';
import { BreadcrumbGroup, Header, SpaceBetween } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { EditHostedZonePage } from '@/components/hosted-zone/EditHostedZonePage';
import { useParams, useRouter } from 'next/navigation';
import { useHostedZones } from '@/contexts/HostedZonesContext';

export default function EditHostedZone() {
  const params = useParams();
  const router = useRouter();
  const zoneId = params.id as string;
  const { hostedZones } = useHostedZones();
  
  const zone = hostedZones.find(z => z.id === zoneId);

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
            { text: zone?.name || zoneId, href: `/hosted-zones/${zoneId}` },
            { text: 'Edit', href: `/hosted-zones/${zoneId}/edit` },
          ]}
          onFollow={e => {
            e.preventDefault();
            router.push(e.detail.href);
          }}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <SpaceBetween size="l">
        <Header variant="h1" description="Change the description and tags for a hosted zone.">
          Edit hosted zone
        </Header>
        <EditHostedZonePage zoneId={zoneId} />
      </SpaceBetween>
    </AppShell>
  );
}
