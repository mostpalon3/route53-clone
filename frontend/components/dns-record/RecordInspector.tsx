"use client";

import React from 'react';
import { Box, Button, SpaceBetween, ColumnLayout } from '@cloudscape-design/components';
import { DnsRecord } from '@/mock/records';

interface RecordInspectorProps {
  selectedItems: DnsRecord[];
}

export function RecordInspector({ selectedItems }: RecordInspectorProps) {
  if (selectedItems.length === 0) {
    return (
      <Box margin={{ vertical: 'm' }} textAlign="center" color="text-body-secondary">
        <b>0 records selected</b>
        <Box>Select a record to see its details.</Box>
      </Box>
    );
  }

  if (selectedItems.length > 1) {
    return (
      <Box margin={{ vertical: 'm' }} textAlign="center" color="text-body-secondary">
        <b>{selectedItems.length} records selected</b>
      </Box>
    );
  }

  const record = selectedItems[0];

  return (
    <Box padding={{ top: 'm', bottom: 'm', horizontal: 'l' }}>
      <SpaceBetween size="l">
        <SpaceBetween size="m" direction="horizontal" alignItems="center">
          <Button>Edit record</Button>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Record name</Box>
          <Box>{record.name}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Record type</Box>
          <Box>{record.type}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Value</Box>
          <Box>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {record.value}
            </div>
          </Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Alias</Box>
          <Box>{record.alias}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">TTL (seconds)</Box>
          <Box>{record.ttl}</Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Routing policy</Box>
          <Box>{record.routingPolicy}</Box>
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
}
