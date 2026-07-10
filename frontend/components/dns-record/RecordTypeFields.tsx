import React from 'react';
import { FormField, Textarea, Select, Link } from '@cloudscape-design/components';
import { RecordFormData } from './RecordFactory';
import { validateRecordValue } from './RecordValidators';

interface RecordTypeFieldsProps {
  data: RecordFormData;
  onChange: (field: keyof RecordFormData, value: any) => void;
  errorText?: string | null;
}

export function RecordTypeFields({ data, onChange, errorText }: RecordTypeFieldsProps) {
  if (data.isAlias) {
    return (
      <FormField
        label="Route traffic to"
        info={<Link variant="info">Info</Link>}
        description="Choose endpoint or enter an AWS resource alias."
        errorText={errorText}
      >
        <Select
          selectedOption={data.value ? { label: data.value, value: data.value } : null}
          onChange={({ detail }) => onChange('value', detail.selectedOption.value)}
          options={[
            { label: 's3-website-us-east-1.amazonaws.com', value: 's3-website-us-east-1.amazonaws.com' },
            { label: 'd2q2e128u923.cloudfront.net', value: 'd2q2e128u923.cloudfront.net' },
          ]}
          placeholder="Choose endpoint"
          enteredTextLabel={(value) => `Use: "${value}"`}
        />
      </FormField>
    );
  }

  let description = "Enter multiple values on separate lines.";
  if (data.type === 'A') description = "Enter IPv4 addresses.";
  if (data.type === 'AAAA') description = "Enter IPv6 addresses.";
  if (data.type === 'CNAME') description = "Enter a single domain name.";
  if (data.type === 'MX') description = "Enter priority and mail server.";

  return (
    <FormField
      label="Value"
      info={<Link variant="info">Info</Link>}
      description={description}
      errorText={errorText}
    >
      <Textarea
        value={data.value}
        onChange={({ detail }) => onChange('value', detail.value)}
        rows={4}
      />
    </FormField>
  );
}
