"use client";

import React from 'react';
import { ExpandableSection, ColumnLayout, Box, Button, SpaceBetween } from '@cloudscape-design/components';
import { HostedZone } from '@/contexts/HostedZonesContext';
import { useRouter } from 'next/navigation';

import { DnsRecord } from '@/mock/records';

interface HostedZoneAccordionProps {
  zone: HostedZone | undefined;
  records?: DnsRecord[];
}

export function HostedZoneAccordion({ zone, records = [] }: HostedZoneAccordionProps) {
  const router = useRouter();

  if (!zone) return null;

  const nsRecord = records.find(r => r.type === 'NS' && r.name === zone.name);
  const nameServers = nsRecord ? nsRecord.value.split('\n') : [];

  return (
    <ExpandableSection
      headerText="Hosted zone details"
      headerActions={<Button onClick={() => router.push(`/hosted-zones/${zone.id}/edit`)}>Edit hosted zone</Button>}
      defaultExpanded={true}
    >
      <ColumnLayout columns={3} variant="text-grid">
        {/* Column 1 */}
        <SpaceBetween size="m">
          <div>
            <Box variant="awsui-key-label">Hosted zone name</Box>
            <div>{zone.name}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Hosted zone ID</Box>
            <div>{zone.id}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Description</Box>
            <div>{zone.description || '-'}</div>
          </div>
        </SpaceBetween>

        {/* Column 2 */}
        <SpaceBetween size="m">
          <div>
            <Box variant="awsui-key-label">Query log</Box>
            <div>-</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Type</Box>
            <div>{zone.type === 'public' ? 'Public hosted zone' : zone.type}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Record count</Box>
            <div>{zone.recordCount}</div>
          </div>
        </SpaceBetween>

        {/* Column 3 */}
        <SpaceBetween size="m">
          <div>
            <Box variant="awsui-key-label">Name servers</Box>
            <div>
              {nameServers.length > 0 ? (
                nameServers.map((ns, idx) => (
                  <div key={idx}>{ns}</div>
                ))
              ) : (
                '-'
              )}
            </div>
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </ExpandableSection>
  );
}
