"use client";

import React, { useState, useCallback } from 'react';
import { BreadcrumbGroup, SplitPanel, SpaceBetween, Flashbar } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { HostedZoneHeader } from '@/components/dns-record/HostedZoneHeader';
import { HostedZoneAccordion } from '@/components/dns-record/HostedZoneAccordion';
import { HostedZoneTabs } from '@/components/dns-record/HostedZoneTabs';
import { RecordInspector } from '@/components/dns-record/RecordInspector';
import { CreateRecordPanel } from '@/components/dns-record/CreateRecordPanel';
import { RecordsTable } from '@/components/dns-record/RecordsTable';
import { DnsRecord, MOCK_RECORDS } from '@/mock/records';
import { useParams, useSearchParams } from 'next/navigation';

export default function HostedZoneDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const zoneId = params.id as string;
  const isNew = searchParams.get('new') === 'true';

  // Decode or mock the zone name based on the ID for visual fidelity
  const zoneName = 'textinsightpro.netlify.app';

  const [records, setRecords] = useState<DnsRecord[]>(MOCK_RECORDS);
  const [selectedItems, setSelectedItems] = useState<DnsRecord[]>([]);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(isNew);
  const [splitPanelPreferences, setSplitPanelPreferences] = useState({ position: 'side' });
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);
  const [showCreatedSuccess, setShowCreatedSuccess] = useState(false);
  
  // Edit state
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [showUpdatedSuccess, setShowUpdatedSuccess] = useState(false);

  // When selection changes, cancel edit mode
  const handleSelectionChange = useCallback((items: DnsRecord[]) => {
    setSelectedItems(items);
    setIsEditingRecord(false);
    if (items.length > 0) {
      setSplitPanelOpen(true);
    } else {
      setSplitPanelOpen(false);
    }
  }, []);

  const handleUpdateRecord = (updatedRecord: DnsRecord) => {
    setRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
    setSelectedItems([updatedRecord]); // keep it selected with new values
    setIsEditingRecord(false);
    setShowUpdatedSuccess(true);
  };

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
            { text: zoneName, href: `/hosted-zones/${zoneId}` },
            ...(isCreatingRecord ? [{ text: 'Create record', href: '#' }] : [])
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      splitPanelOpen={!isCreatingRecord && splitPanelOpen}
      onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
      splitPanelPreferences={splitPanelPreferences as any}
      onSplitPanelPreferencesChange={({ detail }) => setSplitPanelPreferences(detail)}
      splitPanel={
        <SplitPanel
          header={isEditingRecord ? "Edit record" : "Record details"}
          i18nStrings={{
            preferencesTitle: 'Split panel preferences',
            preferencesPositionLabel: 'Split panel position',
            preferencesPositionDescription: 'Choose the default split panel position for the service.',
            preferencesPositionSide: 'Side',
            preferencesPositionBottom: 'Bottom',
            preferencesConfirm: 'Confirm',
            preferencesCancel: 'Cancel',
            closeButtonAriaLabel: 'Close panel',
            openButtonAriaLabel: 'Open panel',
            resizeHandleAriaLabel: 'Resize split panel',
          }}
        >
          <RecordInspector 
            selectedItems={selectedItems} 
            zoneName={zoneName}
            isEditing={isEditingRecord}
            onEdit={() => setIsEditingRecord(true)}
            onCancelEdit={() => setIsEditingRecord(false)}
            onUpdateRecord={handleUpdateRecord}
          />
        </SplitPanel>
      }
    >
      <SpaceBetween size="l">
        {showSuccess && !isCreatingRecord && (
          <Flashbar
            items={[
              {
                type: 'success',
                content: 'Hosted zone was successfully created.',
                dismissible: true,
                onDismiss: () => setShowSuccess(false),
                id: 'success_message',
              }
            ]}
          />
        )}
        {showCreatedSuccess && !isCreatingRecord && (
          <Flashbar
            items={[
              {
                type: 'success',
                content: 'DNS Record created successfully.',
                dismissible: true,
                onDismiss: () => setShowCreatedSuccess(false),
                id: 'record_success',
              }
            ]}
          />
        )}
        {showUpdatedSuccess && !isCreatingRecord && (
          <Flashbar
            items={[
              {
                type: 'success',
                content: 'DNS Record updated successfully.',
                dismissible: true,
                onDismiss: () => setShowUpdatedSuccess(false),
                id: 'record_update_success',
              }
            ]}
          />
        )}

        {!isCreatingRecord ? (
          <>
            <HostedZoneHeader zoneName={zoneName} />
            <HostedZoneAccordion zoneName={zoneName} />
            <HostedZoneTabs
              zoneName={zoneName}
              records={records}
              onCreateRecord={() => setIsCreatingRecord(true)}
              onSelectionChange={handleSelectionChange}
            />
          </>
        ) : (
          <>
            <CreateRecordPanel 
              zoneName={zoneName}
              onCancel={() => setIsCreatingRecord(false)}
              onSuccess={(newRecord) => {
                setRecords(prev => [newRecord, ...prev]);
                setIsCreatingRecord(false);
                setShowCreatedSuccess(true);
              }}
            />
            <div style={{ marginTop: '16px' }}>
              <RecordsTable 
                zoneName={zoneName} 
                records={records} 
                onSelectionChange={() => {}} 
              />
            </div>
          </>
        )}
      </SpaceBetween>
    </AppShell>
  );
}
