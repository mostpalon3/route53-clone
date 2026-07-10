"use client";

import React, { useState } from 'react';
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
import { DnsRecord, MOCK_RECORDS } from '@/mock/records';
import { RecordsTable } from '@/components/dns-record/RecordsTable';
import { RecordEditor } from '@/components/dns-record/RecordEditor';

export default function CreateRecordPage() {
  const params = useParams();
  const router = useRouter();
  const zoneId = params.id as string;
  const zoneName = 'textinsightpro.netlify.app'; // Mock zone name for visual fidelity

  const [records, setRecords] = useState<DnsRecord[]>(MOCK_RECORDS);
  const [recordForms, setRecordForms] = useState([
    { id: '1', data: {} }
  ]);

  const handleCancel = () => {
    router.push(`/hosted-zones/${zoneId}`);
  };

  const handleCreateRecords = () => {
    // Navigate back to details page and show success (mock implementation)
    router.push(`/hosted-zones/${zoneId}?new=true`);
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
                  <Button variant="normal" disabled={recordForms.length === 1}>
                    Delete
                  </Button>
                }
              >
                <div style={{ marginTop: '16px' }}>
                  <RecordEditor
                    record={{ 
                      id: '', 
                      name: '', 
                      type: 'A', 
                      alias: 'No', 
                      value: '', 
                      ttl: '300', 
                      routingPolicy: 'Simple',
                      comment: '' 
                    }}
                    rootDomain={zoneName}
                    isAwsManaged={false}
                    onSubmit={() => {}}
                    onCancel={() => {}}
                    hideActions={true} // Special prop we need to add to RecordEditor to hide standard Cancel/Save buttons
                  />
                </div>
              </ExpandableSection>
            ))}

            <Box float="right">
              <Button>Add another record</Button>
            </Box>
          </SpaceBetween>
        </Container>

        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateRecords} className="aws-danger-button">Create records</Button>
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
                hideActions={true} // Add prop to hide top actions in RecordsTable
              />
            </Container>
          </div>
        </ExpandableSection>
      </SpaceBetween>
    </AppShell>
  );
}
