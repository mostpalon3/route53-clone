"use client";

import React, { useState } from 'react';
import {
  Table,
  Box,
  SpaceBetween,
  Button,
  Header,
  Icon
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { DnsRecord, MOCK_RECORDS } from '@/mock/records';
import { RecordFilters } from './RecordFilters';

interface RecordsTableProps {
  onSelectionChange: (selectedItems: DnsRecord[]) => void;
  zoneName: string;
}

const columnDefinitions = [
  {
    id: 'name',
    header: 'Record name',
    cell: (item: DnsRecord) => item.name,
    sortingField: 'name',
    isRowHeader: true,
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: DnsRecord) => item.type,
    sortingField: 'type',
  },
  {
    id: 'routingPolicy',
    header: 'Routing policy',
    cell: (item: DnsRecord) => item.routingPolicy,
    sortingField: 'routingPolicy',
  },
  {
    id: 'difference',
    header: 'Difference',
    cell: (item: DnsRecord) => item.difference,
  },
  {
    id: 'alias',
    header: 'Alias',
    cell: (item: DnsRecord) => item.alias,
  },
  {
    id: 'value',
    header: 'Value/Route traffic to',
    cell: (item: DnsRecord) => (
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {item.value}
      </div>
    ),
  },
  {
    id: 'ttl',
    header: 'TTL (seconds)',
    cell: (item: DnsRecord) => item.ttl,
  },
];

export function RecordsTable({ onSelectionChange, zoneName }: RecordsTableProps) {
  const [items] = useState<DnsRecord[]>(MOCK_RECORDS);

  const { items: collectionItems, filterProps, collectionProps } = useCollection(
    items,
    {
      filtering: {
        empty: (
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No records</b>
              <Box variant="p" color="inherit">
                There are no records in this hosted zone.
              </Box>
            </SpaceBetween>
          </Box>
        ),
        noMatch: (
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No matches</b>
              <Box variant="p" color="inherit">
                We can&apos;t find a match.
              </Box>
            </SpaceBetween>
          </Box>
        ),
      },
      sorting: {},
      selection: {},
    }
  );

  const isSelectionEmpty = !collectionProps.selectedItems || collectionProps.selectedItems.length === 0;

  // Sync selection outwards
  React.useEffect(() => {
    onSelectionChange(collectionProps.selectedItems as DnsRecord[] || []);
  }, [collectionProps.selectedItems, onSelectionChange]);

  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      items={collectionItems}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="id"
      stickyHeader={true}
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No records</b>
            <Box variant="p" color="inherit">
              There are no records in this hosted zone.
            </Box>
          </SpaceBetween>
        </Box>
      }
      filter={
        <RecordFilters
          filteringText={filterProps.filteringText}
          onChange={(text) => filterProps.onChange({ detail: { filteringText: text } } as any)}
        />
      }
      header={
        <Header
          variant="h2"
          counter={`(${items.length}/2)`}
          description={
            <span>
              The following table lists the existing records in {zoneName}. You can&apos;t delete the SOA record or the NS record named {zoneName}.
            </span>
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button iconName="refresh" ariaLabel="Refresh" />
              <Button disabled={isSelectionEmpty}>Delete record</Button>
              <Button>Import zone file</Button>
              <Button variant="primary">Create record</Button>
            </SpaceBetween>
          }
        >
          Records <Icon name="status-info" variant="link" />
        </Header>
      }
    />
  );
}
