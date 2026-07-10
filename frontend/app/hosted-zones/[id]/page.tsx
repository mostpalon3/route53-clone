"use client";

import React, { useState, useCallback } from 'react';
import { BreadcrumbGroup, SplitPanel, SpaceBetween, Flashbar } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { HostedZoneHeader } from '@/components/dns-record/HostedZoneHeader';
import { HostedZoneAccordion } from '@/components/dns-record/HostedZoneAccordion';
import { HostedZoneTabs } from '@/components/dns-record/HostedZoneTabs';
import { RecordInspector } from '@/components/dns-record/RecordInspector';
import { RecordsTable } from '@/components/dns-record/RecordsTable';
import { DeleteRecordModal } from '@/components/dns-record/DeleteRecordModal';
import { DnsRecord, MOCK_RECORDS } from '@/mock/records';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function HostedZoneDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const zoneId = params.id as string;
  const isNew = searchParams.get('new') === 'true';

  // Decode or mock the zone name based on the ID for visual fidelity
  const zoneName = 'textinsightpro.netlify.app';

  const [records, setRecords] = useState<DnsRecord[]>(MOCK_RECORDS);
  const [selectedItems, setSelectedItems] = useState<DnsRecord[]>([]);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(isNew);
  const [splitPanelPreferences, setSplitPanelPreferences] = useState({ position: 'side' });
  const [showCreatedSuccess, setShowCreatedSuccess] = useState(false);
  
  // Edit state
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [showUpdatedSuccess, setShowUpdatedSuccess] = useState(false);

  // Delete state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordsToDelete, setRecordsToDelete] = useState<DnsRecord[]>([]);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);

  // Fix SSR hydration mismatch for Cloudscape Modal portals
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleDeleteRecords = () => {
    const idsToDelete = new Set(recordsToDelete.map(r => r.id));
    setRecords(prev => prev.filter(r => !idsToDelete.has(r.id)));
    
    const newSelectedItems = selectedItems.filter(r => !idsToDelete.has(r.id));
    setSelectedItems(newSelectedItems);
    
    if (newSelectedItems.length === 0) {
      setIsEditingRecord(false);
      setSplitPanelOpen(false);
    }
    
    setDeletedCount(recordsToDelete.length);
    setShowDeletedSuccess(true);
    setDeleteModalVisible(false);
    setRecordsToDelete([]);
  };

  const openDeleteModal = (records: DnsRecord[]) => {
    setRecordsToDelete(records);
    setDeleteModalVisible(true);
  };

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
            { text: zoneName, href: `/hosted-zones/${zoneId}` }
          ]}
          onFollow={e => {
            e.preventDefault();
            router.push(e.detail.href);
          }}
          ariaLabel="Breadcrumbs"
        />
      }
      splitPanelOpen={splitPanelOpen}
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
        {showSuccess && (
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
        {showCreatedSuccess && (
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
        {showUpdatedSuccess && (
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
        {showDeletedSuccess && (
          <Flashbar
            items={[
              {
                type: 'success',
                content: `${deletedCount} DNS record${deletedCount > 1 ? 's' : ''} deleted successfully.`,
                dismissible: true,
                onDismiss: () => setShowDeletedSuccess(false),
                id: 'record_delete_success',
              }
            ]}
          />
        )}

        <HostedZoneHeader zoneName={zoneName} />
        <HostedZoneAccordion zoneName={zoneName} />
        <HostedZoneTabs
          zoneName={zoneName}
          records={records}
          onCreateRecord={() => router.push(`/hosted-zones/${zoneId}/create-record`)}
          onSelectionChange={handleSelectionChange}
          onDeleteRecord={openDeleteModal}
        />
      </SpaceBetween>
      {mounted && (
        <DeleteRecordModal
          visible={deleteModalVisible}
          onDismiss={() => setDeleteModalVisible(false)}
          onDelete={handleDeleteRecords}
          recordsToDelete={recordsToDelete}
        />
      )}
    </AppShell>
  );
}
