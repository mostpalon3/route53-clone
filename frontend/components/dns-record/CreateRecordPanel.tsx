import React from 'react';
import { Box, SpaceBetween, Header, Button } from '@cloudscape-design/components';
import { RecordForm } from './RecordForm';
import { RecordFormData, createDnsRecord } from './RecordFactory';
import { DnsRecord } from '@/mock/records';

interface CreateRecordPanelProps {
  zoneName: string;
  onCancel: () => void;
  onSuccess: (newRecord: DnsRecord) => void;
}

export function CreateRecordPanel({ zoneName, onCancel, onSuccess }: CreateRecordPanelProps) {
  const handleSubmit = (data: RecordFormData) => {
    const record = createDnsRecord(data, zoneName);
    onSuccess(record);
  };

  return (
    <Box margin={{ bottom: 'xxl' }}>
      <SpaceBetween size="l">
        <Header
          variant="h1"
          info={<Button variant="icon" iconName="status-info" ariaLabel="Info" />}
          actions={<Button>Switch to wizard</Button>}
        >
          Quick create record
        </Header>
        
        <RecordForm
          rootDomain={zoneName}
          onCancel={onCancel}
          onSubmit={handleSubmit}
        />
      </SpaceBetween>
    </Box>
  );
}
