"use client";

import React from 'react';
import { Tabs } from '@cloudscape-design/components';
import { RecordsTable } from './RecordsTable';
import { DnsRecord } from '@/mock/records';

interface HostedZoneTabsProps {
  zoneName: string;
  records: DnsRecord[];
  onSelectionChange: (selectedItems: DnsRecord[]) => void;
  onCreateRecord?: () => void;
}

export function HostedZoneTabs({ zoneName, records, onSelectionChange, onCreateRecord }: HostedZoneTabsProps) {
  return (
    <Tabs
      tabs={[
        {
          label: `Records (${records.length})`,
          id: "records",
          content: <RecordsTable zoneName={zoneName} records={records} onSelectionChange={onSelectionChange} onCreateRecord={onCreateRecord} />
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
