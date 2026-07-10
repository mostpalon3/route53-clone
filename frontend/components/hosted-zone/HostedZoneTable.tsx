"use client";

import React, { useState } from 'react';
import {
  Table,
  Box,
  SpaceBetween,
  Button,
  TextFilter,
  Header,
  Pagination,
  Link,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useRouter } from 'next/navigation';
import { HostedZone, MOCK_HOSTED_ZONES, USE_EMPTY_STATE } from '@/mock/hostedZones';

interface HostedZoneTableProps {
  onSelectionChange?: (selectedItems: HostedZone[]) => void;
}

export function HostedZoneTable({ onSelectionChange }: HostedZoneTableProps = {}) {
  const router = useRouter();
  
  const columnDefinitions = React.useMemo(() => [
    {
      id: 'name',
      header: 'Hosted zone name',
      cell: (item: HostedZone) => (
        <Link 
          href={`/hosted-zones/${item.name.replace('.com', '')}`} 
          onFollow={(e) => {
            e.preventDefault();
            router.push(`/hosted-zones/${item.id}`);
          }}
        >
          {item.name}
        </Link>
      ),
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item: HostedZone) => item.type,
      sortingField: 'type',
    },
    {
      id: 'createdBy',
      header: 'Created by',
      cell: (item: HostedZone) => item.createdBy,
      sortingField: 'createdBy',
    },
    {
      id: 'recordCount',
      header: 'Record count',
      cell: (item: HostedZone) => item.recordCount,
      sortingField: 'recordCount',
    },
    {
      id: 'description',
      header: 'Description',
      cell: (item: HostedZone) => item.description,
      sortingField: 'description',
    },
    {
      id: 'id',
      header: 'Hosted zone ID',
      cell: (item: HostedZone) => item.id,
      sortingField: 'id',
    },
  ], [router]);

  const [items] = useState<HostedZone[]>(USE_EMPTY_STATE ? [] : MOCK_HOSTED_ZONES);

  const { items: collectionItems, filterProps, collectionProps } = useCollection(
    items,
    {
      filtering: {
        empty: (
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hosted zones</b>
              <Box variant="p" color="inherit">
                There are no hosted zones created for this account.
              </Box>
              <Button onClick={() => router.push('/hosted-zones/new')} variant="primary">
                Create hosted zone
              </Button>
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

  React.useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(collectionProps.selectedItems as HostedZone[] || []);
    }
  }, [collectionProps.selectedItems, onSelectionChange]);

  return (
    <Table
      {...collectionProps}
      variant="full-page"
      columnDefinitions={columnDefinitions}
      items={collectionItems}
      loadingText="Loading resources"
      selectionType="single"
      trackBy="id"
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hosted zones</b>
            <Box variant="p" color="inherit">
              There are no hosted zones created for this account.
            </Box>
            <Button onClick={() => router.push('/hosted-zones/new')} variant="primary">
              Create hosted zone
            </Button>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringPlaceholder="Filter records by property or value"
        />
      }
      header={
        <Header
          variant="h1"
          counter={`(${items.length})`}
          description={
            <span>
              Automatic mode is the current search behavior optimized for best filter results. <Link href="#">To change modes go to settings.</Link>
            </span>
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button iconName="refresh" ariaLabel="Refresh" />
              <Button disabled={isSelectionEmpty}>View details</Button>
              <Button disabled={isSelectionEmpty}>Edit</Button>
              <Button disabled={isSelectionEmpty}>Delete</Button>
              <Button
                variant="primary"
                onClick={() => router.push('/hosted-zones/new')}
              >
                Create hosted zone
              </Button>
            </SpaceBetween>
          }
        >
          Hosted zones
        </Header>
      }
    />
  );
}
