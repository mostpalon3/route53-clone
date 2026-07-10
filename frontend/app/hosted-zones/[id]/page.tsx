"use client";

import React, { useState } from 'react';
import { BreadcrumbGroup, SplitPanel, SpaceBetween, Flashbar } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { HostedZoneHeader } from '@/components/dns-record/HostedZoneHeader';
import { HostedZoneAccordion } from '@/components/dns-record/HostedZoneAccordion';
import { HostedZoneTabs } from '@/components/dns-record/HostedZoneTabs';
import { RecordInspector } from '@/components/dns-record/RecordInspector';
import { DnsRecord } from '@/mock/records';
import { useParams, useSearchParams } from 'next/navigation';

export default function HostedZoneDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const zoneId = params.id as string;
  const isNew = searchParams.get('new') === 'true';

  // Decode or mock the zone name based on the ID for visual fidelity
  const zoneName = 'textinsightpro.netlify.app';

  const [selectedItems, setSelectedItems] = useState<DnsRecord[]>([]);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(isNew);
  const [splitPanelPreferences, setSplitPanelPreferences] = useState({ position: 'side' });

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
            { text: zoneName, href: `/hosted-zones/${zoneId}` },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      splitPanelOpen={splitPanelOpen}
      onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
      splitPanelPreferences={splitPanelPreferences as any}
      onSplitPanelPreferencesChange={({ detail }) => setSplitPanelPreferences(detail)}
      splitPanel={
        <SplitPanel
          header="Record details"
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
          <RecordInspector selectedItems={selectedItems} />
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
        <HostedZoneHeader zoneName={zoneName} />
        <HostedZoneAccordion zoneName={zoneName} />
        <HostedZoneTabs
          zoneName={zoneName}
          onSelectionChange={(items) => {
            setSelectedItems(items);
            if (items.length > 0) {
              setSplitPanelOpen(true);
            } else {
              setSplitPanelOpen(false);
            }
          }}
        />
      </SpaceBetween>
    </AppShell>
  );
}
