"use client";

import React, { useState } from 'react';
import {
  Table,
  Box,
  SpaceBetween,
  Button,
  Header,
  Icon,
  Popover
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { DnsRecord, MOCK_RECORDS } from '@/mock/records';
import { RecordFilters } from './RecordFilters';

interface RecordsTableProps {
  onSelectionChange: (selectedItems: DnsRecord[]) => void;
  zoneName: string;
  records: DnsRecord[];
  onCreateRecord?: () => void;
  onDeleteRecord?: (recordsToDelete: DnsRecord[]) => void;
  hideActions?: boolean;
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
    id: 'setIdentifier',
    header: 'Set identifier',
    cell: (item: DnsRecord) => item.setIdentifier,
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
  {
    id: 'healthCheckId',
    header: 'Health check ID',
    cell: (item: DnsRecord) => item.healthCheckId,
  },
  {
    id: 'evaluateTargetHealth',
    header: 'Evaluate target health',
    cell: (item: DnsRecord) => item.evaluateTargetHealth,
  },
  {
    id: 'recordId',
    header: 'Record ID',
    cell: (item: DnsRecord) => item.record_id,
  },
];

export function RecordsTable({ onSelectionChange, zoneName, records, onCreateRecord, onDeleteRecord, hideActions = false }: RecordsTableProps) {
  const { items: collectionItems, filterProps, collectionProps } = useCollection(
    records,
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

  const selectedItems = (collectionProps.selectedItems as DnsRecord[]) || [];
  const isSelectionEmpty = selectedItems.length === 0;
  const isOnlyProtectedSelected = selectedItems.length > 0 && selectedItems.every(r => r.type === 'NS' || r.type === 'SOA');

  const getDeleteButton = () => {
    const btn = (
      <Button 
        disabled={isSelectionEmpty || isOnlyProtectedSelected}
        onClick={() => {
          if (!isSelectionEmpty && !isOnlyProtectedSelected) {
            onDeleteRecord?.(selectedItems.filter(r => r.type !== 'NS' && r.type !== 'SOA'));
          }
        }}
      >
        Delete record
      </Button>
    );

    if (isOnlyProtectedSelected) {
      return (
        <Popover
          position="top"
          size="medium"
          triggerType="custom"
          content="This AWS-managed record cannot be deleted."
        >
          <span style={{ display: 'inline-block', cursor: 'not-allowed' }}>
            {btn}
          </span>
        </Popover>
      );
    }
    return btn;
  };

  // Sync selection outwards
  React.useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

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
          counter={`(${records.length})`}
          description={
            <span>
              The following table lists the existing records in {zoneName}. You can&apos;t delete the SOA record or the NS record named {zoneName}.
            </span>
          }
          actions={
            !hideActions && (
              <SpaceBetween direction="horizontal" size="xs">
                <Button iconName="refresh" ariaLabel="Refresh" />
                {getDeleteButton()}
                <Button>Import zone file</Button>
                <span className="aws-yellow-button">
                  <Button variant="primary" onClick={onCreateRecord}>Create record</Button>
                </span>
              </SpaceBetween>
            )
          }
        >
          Records <Icon name="status-info" variant="link" />
        </Header>
      }
    />
  );
}
