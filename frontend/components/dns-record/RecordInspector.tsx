"use client";

import React from 'react';
import { Box, Button, SpaceBetween, ColumnLayout } from '@cloudscape-design/components';
import { DnsRecord } from '@/mock/records';

import { EditRecordPanel } from './EditRecordPanel';

interface RecordInspectorProps {
  selectedItems: DnsRecord[];
  zoneName: string;
  isEditing?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onUpdateRecord?: (updatedRecord: DnsRecord) => void;
}

export function RecordInspector({ 
  selectedItems, 
  zoneName, 
  isEditing, 
  onEdit, 
  onCancelEdit, 
  onUpdateRecord 
}: RecordInspectorProps) {
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

  if (isEditing) {
    return (
      <EditRecordPanel
        record={record}
        zoneName={zoneName}
        onCancel={onCancelEdit!}
        onSuccess={onUpdateRecord!}
      />
    );
  }

  return (
    <Box padding={{ top: 'm', bottom: 'm', horizontal: 'l' }}>
      <SpaceBetween size="l">
        <SpaceBetween size="m" direction="horizontal" alignItems="center">
          <Button onClick={onEdit}>Edit record</Button>
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
