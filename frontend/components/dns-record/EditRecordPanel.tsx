import React from 'react';
import { Box } from '@cloudscape-design/components';
import { RecordEditor } from './RecordEditor';
import { RecordFormData } from './RecordFactory';
import { DnsRecord } from '@/mock/records';

interface EditRecordPanelProps {
  record: DnsRecord;
  zoneName: string;
  onCancel: () => void;
  onSuccess: (updatedRecord: DnsRecord) => void;
}

export function EditRecordPanel({ record, zoneName, onCancel, onSuccess }: EditRecordPanelProps) {
  const isAwsManaged = record.type === 'NS' || record.type === 'SOA';

  const handleSubmit = (data: RecordFormData) => {
    // Reconstruct the full domain name
    const fullDomainName = data.name.trim() === '' ? zoneName : `${data.name.trim()}.${zoneName}`;

    const updatedRecord: DnsRecord = {
      ...record,
      name: fullDomainName,
      type: data.type,
      routingPolicy: data.routingPolicy,
      alias: data.isAlias ? 'Yes' : 'No',
      value: data.value,
      ttl: data.ttl,
      comment: data.comment,
    };

    onSuccess(updatedRecord);
  };

  return (
    <Box padding={{ top: 'm', bottom: 'm', horizontal: 'l' }}>
      <RecordEditor
        record={record}
        rootDomain={zoneName}
        isAwsManaged={isAwsManaged}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
