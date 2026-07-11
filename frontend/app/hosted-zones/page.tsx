"use client";

import React, { useState } from 'react';
import { BreadcrumbGroup, SplitPanel, SpaceBetween, Flashbar } from '@cloudscape-design/components';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { HostedZoneTable } from '@/components/hosted-zone/HostedZoneTable';
import { HostedZoneInspector } from '@/components/hosted-zone/HostedZoneInspector';
import { HostedZone } from '@/mock/hostedZones';
import { useHostedZones } from '@/contexts/HostedZonesContext';
import { DeleteHostedZoneModal } from '@/components/hosted-zone/DeleteHostedZoneModal';

export default function HostedZonesPage() {
  const router = useRouter();
  const { deleteHostedZone } = useHostedZones();
  
  const [selectedItems, setSelectedItems] = useState<HostedZone[]>([]);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelPreferences, setSplitPanelPreferences] = useState({ position: 'side' });

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState<HostedZone | null>(null);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [deletedZoneName, setDeletedZoneName] = useState('');

  // Fix SSR hydration mismatch for Modal portals
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeleteConfirm = () => {
    if (zoneToDelete) {
      deleteHostedZone(zoneToDelete.id);
      setDeletedZoneName(zoneToDelete.name);
      setShowDeletedSuccess(true);
      setDeleteModalVisible(false);
      setZoneToDelete(null);
      setSelectedItems([]);
      setSplitPanelOpen(false);
    }
  };

  const openDeleteModal = (items: HostedZone[]) => {
    if (items.length > 0) {
      setZoneToDelete(items[0]);
      setDeleteModalVisible(true);
    }
  };

  return (
    <AppShell
      contentType="table"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
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
          header="Hosted zone details"
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
          <HostedZoneInspector selectedItems={selectedItems} />
        </SplitPanel>
      }
    >
      <SpaceBetween size="l">
        {showDeletedSuccess && (
          <Flashbar
            items={[
              {
                type: 'success',
                content: `Hosted zone ${deletedZoneName} deleted successfully.`,
                dismissible: true,
                onDismiss: () => setShowDeletedSuccess(false),
                id: 'zone_delete_success',
              }
            ]}
          />
        )}
        <HostedZoneTable 
          onSelectionChange={(items) => {
            setSelectedItems(items);
            if (items.length > 0) {
              setSplitPanelOpen(true);
            } else {
              setSplitPanelOpen(false);
            }
          }}
          onDeleteClick={openDeleteModal}
        />
      </SpaceBetween>
      {mounted && (
        <DeleteHostedZoneModal
          visible={deleteModalVisible}
          onDismiss={() => {
            setDeleteModalVisible(false);
            setZoneToDelete(null);
          }}
          onDelete={handleDeleteConfirm}
          zone={zoneToDelete}
        />
      )}
    </AppShell>
  );
}
