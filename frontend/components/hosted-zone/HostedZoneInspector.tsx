"use client";

import React from 'react';
import { Box, SpaceBetween } from '@cloudscape-design/components';
import { HostedZone } from '@/contexts/HostedZonesContext';

interface HostedZoneInspectorProps {
  selectedItems: HostedZone[];
}

export function HostedZoneInspector({ selectedItems }: HostedZoneInspectorProps) {
  if (selectedItems.length === 0) {
    return (
      <Box margin={{ vertical: 'm' }} textAlign="center" color="text-body-secondary">
        <b>0 hosted zones selected</b>
        <Box>Select a hosted zone to see its details.</Box>
      </Box>
    );
  }

  if (selectedItems.length > 1) {
    return (
      <Box margin={{ vertical: 'm' }} textAlign="center" color="text-body-secondary">
        <b>{selectedItems.length} hosted zones selected</b>
      </Box>
    );
  }

  const zone = selectedItems[0];

  return (
    <Box padding={{ top: 'm', bottom: 'm', horizontal: 'l' }}>
      <SpaceBetween size="l">
        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Hosted zone name</Box>
          <Box>{zone.name}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Hosted zone ID</Box>
          <Box>{zone.id}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Description</Box>
          <Box>{zone.description || '-'}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Query log</Box>
          <Box>-</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Type</Box>
          <Box>{zone.type} hosted zone</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Record count</Box>
          <Box>{zone.recordCount}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Name servers</Box>
          <Box>
            <ul style={{ paddingLeft: '1rem', margin: 0 }}>
              <li>ns-733.awsdns-27.net</li>
              <li>ns-126.awsdns-15.com</li>
              <li>ns-1314.awsdns-36.org</li>
              <li>ns-1618.awsdns-10.co.uk</li>
            </ul>
          </Box>
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
}
