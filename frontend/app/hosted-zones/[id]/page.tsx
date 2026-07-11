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
import { DeleteHostedZoneModal } from '@/components/hosted-zone/DeleteHostedZoneModal';
import { DnsRecord } from '@/mock/records';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useHostedZones } from '@/contexts/HostedZonesContext';
import { dnsRecordService } from '@/services/dnsRecordService';

export default function HostedZoneDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const zoneId = params.id as string;
  const isNew = searchParams.get('new') === 'true';
  const isUpdated = searchParams.get('updated') === 'true';

  const { hostedZones, deleteHostedZone } = useHostedZones();
  const zone = hostedZones.find(z => z.id === zoneId);
  const zoneName = zone ? zone.name : 'Unknown Zone';

  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [selectedItems, setSelectedItems] = useState<DnsRecord[]>([]);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(isNew);
  const [showZoneUpdatedSuccess, setShowZoneUpdatedSuccess] = useState(isUpdated);
  const [splitPanelPreferences, setSplitPanelPreferences] = useState({ position: 'side' });
  const [showCreatedSuccess, setShowCreatedSuccess] = useState(false);
  
  React.useEffect(() => {
    if (zone && zone.pk) {
      setIsLoadingRecords(true);
      dnsRecordService.getRecords(zone.pk)
        .then(data => {
          setRecords(data.map(r => ({
            id: String(r.id), // Used for table selection (Cloudscape requirement)
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
  
  // Edit state
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [showUpdatedSuccess, setShowUpdatedSuccess] = useState(false);

  // Delete Record state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordsToDelete, setRecordsToDelete] = useState<DnsRecord[]>([]);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);

  // Delete Zone state
  const [deleteZoneModalVisible, setDeleteZoneModalVisible] = useState(false);

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

  const handleDeleteZone = () => {
    if (zone) {
      deleteHostedZone(zone.id);
      router.push('/hosted-zones');
    }
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
        {showZoneUpdatedSuccess && (
          <Flashbar
            items={[
              {
                type: 'success',
                content: 'Hosted zone updated successfully.',
                dismissible: true,
                onDismiss: () => setShowZoneUpdatedSuccess(false),
                id: 'zone_update_success',
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

        <HostedZoneHeader zoneName={zoneName} onDeleteClick={() => setDeleteZoneModalVisible(true)} />
        <HostedZoneAccordion zone={zone} />
        <HostedZoneTabs
          zoneName={zoneName}
          records={records}
          onCreateRecord={() => router.push(`/hosted-zones/${zoneId}/create-record`)}
          onSelectionChange={handleSelectionChange}
          onDeleteRecord={openDeleteModal}
        />
      </SpaceBetween>
      {mounted && (
        <>
          <DeleteRecordModal
            visible={deleteModalVisible}
            onDismiss={() => setDeleteModalVisible(false)}
            onDelete={handleDeleteRecords}
            recordsToDelete={recordsToDelete}
          />
          <DeleteHostedZoneModal
            visible={deleteZoneModalVisible}
            onDismiss={() => setDeleteZoneModalVisible(false)}
            onDelete={handleDeleteZone}
            zone={zone || null}
          />
        </>
      )}
    </AppShell>
  );
}
