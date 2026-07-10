import React, { useState } from 'react';
import { 
  Form, 
  SpaceBetween, 
  Button, 
  Container, 
  Header, 
  FormField, 
  Input, 
  Select, 
  Toggle, 
  ColumnLayout, 
  Grid 
} from '@cloudscape-design/components';
import { RecordFormData } from './RecordFactory';
import { RecordTypeFields } from './RecordTypeFields';
import { validateRecordValue, validatePositiveInteger } from './RecordValidators';

interface RecordFormProps {
  rootDomain: string;
  onCancel: () => void;
  onSubmit: (data: RecordFormData) => void;
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
  { label: 'DS – Specifies a delegation signer', value: 'DS' },
];

export function RecordForm({ rootDomain, onCancel, onSubmit }: RecordFormProps) {
  const [data, setData] = useState<RecordFormData>({
    name: '',
    type: 'A',
    ttl: '300',
    routingPolicy: 'Simple routing',
    isAlias: false,
    value: '',
  });

  const [errors, setErrors] = useState<{ value?: string | null, ttl?: string | null }>({});

  const handleChange = (field: keyof RecordFormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null })); // clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const valueError = validateRecordValue(data.type, data.value);
    const ttlError = !validatePositiveInteger(data.ttl) ? 'TTL must be a positive integer.' : null;

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
            <Button variant="link" onClick={onCancel}>Cancel</Button>
            <Button variant="primary" formAction="submit">Create records</Button>
          </SpaceBetween>
        }
        secondaryActions={
          <Button>Add another record</Button>
        }
      >
        <Container
          header={
            <Header variant="h2" actions={<Button>Delete</Button>}>
              Record 1
            </Header>
          }
        >
          <SpaceBetween size="l">
            <ColumnLayout columns={2}>
              <FormField
                label="Record name"
                description="Keep blank to create a record for the root domain."
              >
                <Grid gridDefinition={[{ colspan: 7 }, { colspan: 5 }]}>
                  <Input
                    value={data.name}
                    onChange={({ detail }) => handleChange('name', detail.value)}
                    placeholder="subdomain"
                  />
                  <div style={{ padding: '4px 0 0 8px', color: 'var(--color-text-body-secondary-5c1t80)' }}>
                    .{rootDomain}
                  </div>
                </Grid>
              </FormField>

              <FormField label="Record type">
                <Select
                  selectedOption={RECORD_TYPES.find(t => t.value === data.type) || RECORD_TYPES[0]}
                  onChange={({ detail }) => handleChange('type', detail.selectedOption.value)}
                  options={RECORD_TYPES}
                />
              </FormField>
            </ColumnLayout>

            <Toggle
              checked={data.isAlias}
              onChange={({ detail }) => handleChange('isAlias', detail.checked)}
            >
              Alias
            </Toggle>

            <RecordTypeFields
              data={data}
              onChange={handleChange}
              errorText={errors.value}
            />

            <ColumnLayout columns={2}>
              <FormField
                label="TTL (seconds)"
                description="Recommended values: 60 to 172800 (two days)"
                errorText={errors.ttl}
              >
                <Grid gridDefinition={[{ colspan: 5 }, { colspan: 7 }]}>
                  <Input
                    value={data.ttl}
                    onChange={({ detail }) => handleChange('ttl', detail.value)}
                  />
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button onClick={() => handleChange('ttl', '60')}>1m</Button>
                    <Button onClick={() => handleChange('ttl', '3600')}>1h</Button>
                    <Button onClick={() => handleChange('ttl', '86400')}>1d</Button>
                  </SpaceBetween>
                </Grid>
              </FormField>

              <FormField label="Routing policy">
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
            </ColumnLayout>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
