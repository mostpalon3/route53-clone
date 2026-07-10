import React, { useState } from 'react';
import { 
  Form, 
  SpaceBetween, 
  Button, 
  FormField, 
  Input, 
  Select, 
  Toggle, 
  Box,
  Alert,
  Link,
  TextContent
} from '@cloudscape-design/components';
import { DnsRecord } from '@/mock/records';
import { RecordFormData } from './RecordFactory';
import { RecordTypeFields } from './RecordTypeFields';
import { validateRecordValue, validatePositiveInteger } from './RecordValidators';

interface RecordEditorProps {
  record: DnsRecord;
  rootDomain: string;
  isAwsManaged: boolean;
  onCancel: () => void;
  onSubmit: (data: RecordFormData) => void;
  hideActions?: boolean;
}

const RECORD_TYPES = [
  { label: 'A – Routes traffic to an IPv4 address and some AWS resources', value: 'A' },
  { label: 'AAAA – Routes traffic to an IPv6 address and some AWS resources', value: 'AAAA' },
  { label: 'CNAME – Routes traffic to another domain name and to some AWS resources', value: 'CNAME' },
  { label: 'MX – Specifies mail servers', value: 'MX' },
  { label: 'TXT – Routes traffic to text strings', value: 'TXT' },
  { label: 'PTR – Routes traffic to a domain name', value: 'PTR' },
  { label: 'SRV – Routes traffic to a service', value: 'SRV' },
  { label: 'SPF – Specifies SPF records', value: 'SPF' },
  { label: 'CAA – Specifies certificate authorities', value: 'CAA' },
  { label: 'NS – Name server', value: 'NS' },
  { label: 'SOA – Start of authority record', value: 'SOA' },
];

export function RecordEditor({ record, rootDomain, isAwsManaged = false, onCancel, onSubmit, hideActions = false }: RecordEditorProps) {
  // Initialize state from existing record
  const [data, setData] = useState<RecordFormData>({
    name: record.name.replace(`.${rootDomain}`, '').replace(rootDomain, ''),
    type: record.type,
    ttl: record.ttl.replace(/,/g, ''), // clean up commas if any
    routingPolicy: record.routingPolicy,
    isAlias: record.alias === 'Yes',
    value: record.value,
    comment: record.comment || '',
  });

  const [errors, setErrors] = useState<{ value?: string | null, ttl?: string | null }>({});

  const handleChange = (field: keyof RecordFormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valueError = validateRecordValue(data.type, data.value);
    // Allow empty value for alias, or custom validation
    if (data.isAlias && !data.value) valueError = 'Please choose an endpoint.';

    let ttlError = null;
    if (data.ttl !== '-') {
      ttlError = !validatePositiveInteger(data.ttl) ? 'TTL must be a positive integer.' : null;
    }

    if (valueError || ttlError) {
      setErrors({ value: valueError, ttl: ttlError });
      return;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            {!hideActions && (
              <>
                <Button variant="link" onClick={onCancel}>Cancel</Button>
                <Button variant="primary" formAction="submit">Save</Button>
              </>
            )}
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          {isAwsManaged && data.type === 'NS' && (
            <Alert
              type="warning"
              header="When you create a hosted zone, Amazon Route 53 allocates a delegation set (a set of four name servers) to serve your hosted zone. Route 53 then creates a name server (NS) record inside the zone, with the same name as your hosted zone, that lists the four allocated name servers."
            >
              If you change this NS record, it doesn't change the name servers that Route 53 allocated. There are use cases when you might change the NS record, such as configuring branded name servers. However, be aware that making incorrect changes to the NS record can cause your domain to become unavailable on the internet. <Link external href="#">Learn more</Link>
            </Alert>
          )}

          <FormField label="Record name">
            <TextContent>
              <p style={{ margin: 0 }}>{record.name}</p>
            </TextContent>
          </FormField>

          <FormField label="Record type">
            <TextContent>
              <p style={{ margin: 0 }}>
                {RECORD_TYPES.find(t => t.value === data.type)?.label || data.type}
              </p>
            </TextContent>
          </FormField>

          <Toggle
            checked={data.isAlias}
            onChange={({ detail }) => handleChange('isAlias', detail.checked)}
          >
            Alias
          </Toggle>

          <Box>
            <RecordTypeFields
              data={data}
              onChange={handleChange}
              errorText={errors.value}
            />
          </Box>

          <FormField
            label="TTL (seconds)"
            info={<Link variant="info">Info</Link>}
            description="Recommended values: 60 to 172800 (two days)"
            errorText={errors.ttl}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Input
                value={data.ttl}
                onChange={({ detail }) => handleChange('ttl', detail.value)}
              />
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={() => handleChange('ttl', '60')}>1m</Button>
                <Button onClick={() => handleChange('ttl', '3600')}>1h</Button>
                <Button onClick={() => handleChange('ttl', '86400')}>1d</Button>
              </SpaceBetween>
            </div>
          </FormField>

          <FormField 
            label="Routing policy"
            info={<Link variant="info">Info</Link>}
          >
            <Select
              selectedOption={{ label: data.routingPolicy, value: data.routingPolicy }}
              onChange={({ detail }) => handleChange('routingPolicy', detail.selectedOption.value)}
              options={[
                { label: 'Simple routing', value: 'Simple routing' },
                { label: 'Weighted routing', value: 'Weighted routing' },
                { label: 'Latency routing', value: 'Latency routing' },
                { label: 'Failover routing', value: 'Failover routing' },
              ]}
            />
          </FormField>
          
          <FormField label="Comment">
            <Input
              value={data.comment || ''}
              onChange={({ detail }) => handleChange('comment', detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </form>
  );
}
