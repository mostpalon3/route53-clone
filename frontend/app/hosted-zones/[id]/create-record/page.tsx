"use client";

import React, { useState, useEffect } from 'react';
import { 
  AppLayout, 
  BreadcrumbGroup, 
  Container, 
  Header, 
  SpaceBetween, 
  Button, 
  ExpandableSection,
  Link,
  Box
} from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { useParams, useRouter } from 'next/navigation';
import { DnsRecord } from '@/mock/records';
import { RecordsTable } from '@/components/dns-record/RecordsTable';
import { RecordEditor } from '@/components/dns-record/RecordEditor';
import { useHostedZones } from '@/contexts/HostedZonesContext';
import { dnsRecordService } from '@/services/dnsRecordService';

export default function CreateRecordPage() {
  const params = useParams();
  const router = useRouter();
  const zoneId = params.id as string;
  
  const { hostedZones } = useHostedZones();
  const zone = hostedZones.find(z => z.id === zoneId);
  const zoneName = zone ? zone.name : 'Unknown Zone';

  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);

  useEffect(() => {
    if (zone && zone.pk) {
      setIsLoadingRecords(true);
      dnsRecordService.getRecords(zone.pk)
        .then(data => {
          setRecords(data.map(r => ({
            id: String(r.id),
            record_id: r.record_id,
            name: r.record_name,
            type: r.record_type,
            routingPolicy: r.routing_policy,
            setIdentifier: r.set_identifier || '-',
            alias: r.alias ? 'Yes' : 'No',
            value: r.value || '-',
            ttl: r.ttl ? String(r.ttl) : '-',
            healthCheckId: r.health_check_id || '-',
            evaluateTargetHealth: r.evaluate_target_health ? 'Yes' : 'No',
          })));
        })
        .catch(console.error)
        .finally(() => setIsLoadingRecords(false));
    }
  }, [zone]);

  const [recordForms, setRecordForms] = useState<Array<{ id: string, data: any }>>([
    { id: '1', data: {} }
  ]);

  const handleAddRecord = () => {
    setRecordForms(prev => [
      ...prev,
      { id: Date.now().toString(), data: {} }
    ]);
  };

  const handleDeleteRecord = (idToRemove: string) => {
    setRecordForms(prev => prev.filter(form => form.id !== idToRemove));
  };

  const handleRecordChange = (id: string, newData: any) => {
    setRecordForms(prev => prev.map(form => form.id === id ? { ...form, data: newData } : form));
  };

  const handleCancel = () => {
    router.push(`/hosted-zones/${zoneId}`);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRecords = async () => {
    if (!zone || !zone.pk) return;
    
    setIsSubmitting(true);
    try {
      for (const form of recordForms) {
        if (!form.data.type || !form.data.value) {
          // Basic validation to skip completely empty forms
          if (!form.data.isAlias) {
            continue; 
          }
        }
        
        await dnsRecordService.createRecord(zone.pk, {
           record_name: form.data.name ? `${form.data.name}.${zoneName}` : zoneName,
           record_type: form.data.type,
           routing_policy: form.data.routingPolicy || 'Simple',
           alias: form.data.isAlias || false,
           value: form.data.value || '',
           ttl: form.data.ttl === '-' ? undefined : parseInt(form.data.ttl || '300'),
           comment: form.data.comment
        });
      }
      router.push(`/hosted-zones/${zoneId}?new=true`);
    } catch (e) {
      console.error('Failed to create records', e);
      alert('Failed to create one or more records. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
            { text: zoneName, href: `/hosted-zones/${zoneId}` },
            { text: 'Create record', href: '#' }
          ]}
          onFollow={e => {
            e.preventDefault();
            if (e.detail.href !== '#') router.push(e.detail.href);
          }}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <SpaceBetween size="l">
        <Header
          variant="h1"
          info={<Link variant="info">Info</Link>}
        >
          Create record
        </Header>

        <Container
          header={
            <Header
              variant="h2"
              actions={<Button variant="link">Switch to wizard</Button>}
            >
              Quick create record
            </Header>
          }
        >
          <SpaceBetween size="m">
            {recordForms.map((form, index) => (
              <ExpandableSection
                key={form.id}
                defaultExpanded
                headerText={`Record ${index + 1}`}
                headerActions={
                  <Button 
                    variant="normal" 
                    disabled={recordForms.length === 1}
                    onClick={() => handleDeleteRecord(form.id)}
                  >
                    Delete
                  </Button>
                }
              >
                <div style={{ marginTop: '16px' }}>
                  <RecordEditor
                    record={{ 
                      id: '',
                      record_id: '',
                      name: '', 
                      type: 'A', 
                      alias: 'No', 
                      value: '', 
                      ttl: '300', 
                      routingPolicy: 'Simple',
                      setIdentifier: '',
                      healthCheckId: '',
                      evaluateTargetHealth: 'No',
                      comment: '' 
                    }}
                    rootDomain={zoneName}
                    isAwsManaged={false}
                    onSubmit={() => {}}
                    onChange={(data) => handleRecordChange(form.id, data)}
                    onCancel={() => {}}
                    hideActions={true}
                    isCreating={true}
                  />
                </div>
              </ExpandableSection>
            ))}

            <Box float="right">
              <Button onClick={handleAddRecord}>Add another record</Button>
            </Box>
          </SpaceBetween>
        </Container>

        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateRecords} loading={isSubmitting} className="aws-danger-button">Create records</Button>
          </SpaceBetween>
        </Box>

        <ExpandableSection
          headerText="View existing records"
          defaultExpanded
        >
          <div style={{ marginTop: '8px' }}>
            <Box variant="p" color="text-body-secondary" padding={{ bottom: 'm' }}>
              The following table lists the existing records in {zoneName}.
            </Box>
            <Container
              header={
                <Header
                  variant="h2"
                  counter={`(${records.length})`}
                  info={<Link variant="info">Info</Link>}
                  description={
                    <span>
                      Automatic mode is the current search behavior optimized for best filter results. <Link>To change modes go to settings.</Link>
                    </span>
                  }
                >
                  Existing records
                </Header>
              }
            >
              <RecordsTable 
                zoneName={zoneName} 
                records={records} 
                onSelectionChange={() => {}} 
                hideActions={true} 
              />
            </Container>
          </div>
        </ExpandableSection>
      </SpaceBetween>
    </AppShell>
  );
}
