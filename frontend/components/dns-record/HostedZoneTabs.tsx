"use client";

import React from 'react';
import { Tabs } from '@cloudscape-design/components';
import { RecordsTable } from './RecordsTable';
import { DnsRecord } from '@/mock/records';

interface HostedZoneTabsProps {
  zoneName: string;
  onSelectionChange: (selectedItems: DnsRecord[]) => void;
}

export function HostedZoneTabs({ zoneName, onSelectionChange }: HostedZoneTabsProps) {
  return (
    <Tabs
      tabs={[
        {
          label: "Records (2)",
          id: "records",
          content: <RecordsTable zoneName={zoneName} onSelectionChange={onSelectionChange} />
        },
        {
          label: "Accelerated recovery",
          id: "recovery",
          content: "Coming Soon"
        },
        {
          label: "DNSSEC signing",
          id: "dnssec",
          content: "Coming Soon"
        },
        {
          label: "Hosted zone tags (2)",
          id: "tags",
          content: "Coming Soon"
        }
      ]}
    />
  );
}
