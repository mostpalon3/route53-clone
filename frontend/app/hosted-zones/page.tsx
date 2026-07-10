"use client";

import React, { useState } from 'react';
import { BreadcrumbGroup, SplitPanel } from '@cloudscape-design/components';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { HostedZoneTable } from '@/components/hosted-zone/HostedZoneTable';
import { HostedZoneInspector } from '@/components/hosted-zone/HostedZoneInspector';
import { HostedZone } from '@/mock/hostedZones';

export default function HostedZonesPage() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<HostedZone[]>([]);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelPreferences, setSplitPanelPreferences] = useState({ position: 'side' });

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
      <HostedZoneTable 
        onSelectionChange={(items) => {
          setSelectedItems(items);
          if (items.length > 0) {
            setSplitPanelOpen(true);
          } else {
            setSplitPanelOpen(false);
          }
        }} 
      />
    </AppShell>
  );
}
