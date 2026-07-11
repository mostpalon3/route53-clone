"use client";

import React from 'react';
import { ExpandableSection, ColumnLayout, Box, Button } from '@cloudscape-design/components';
import { HostedZone } from '@/mock/hostedZones';
import { useRouter } from 'next/navigation';

interface HostedZoneAccordionProps {
  zone: HostedZone | undefined;
}

export function HostedZoneAccordion({ zone }: HostedZoneAccordionProps) {
  const router = useRouter();

  if (!zone) return null;

  return (
    <ExpandableSection
      headerText="Hosted zone details"
      headerActions={<Button onClick={() => router.push(`/hosted-zones/${zone.id}/edit`)}>Edit hosted zone</Button>}
      defaultExpanded={false}
    >
      <ColumnLayout columns={4} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Hosted zone ID</Box>
          <div>{zone.id}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Created by</Box>
          <div>{zone.createdBy}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Type</Box>
          <div>{zone.type}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Record count</Box>
          <div>{zone.recordCount}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Comment</Box>
          <div>{zone.description || '-'}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Creation date</Box>
          <div>July 10, 2026, 12:00:00 (UTC+05:30)</div>
        </div>
      </ColumnLayout>
    </ExpandableSection>
  );
}
