"use client";

import React from 'react';
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
import { USE_EMPTY_STATE } from '@/mock/hostedZones';
import { useHostedZones, HostedZone } from '@/contexts/HostedZonesContext';

interface HostedZoneTableProps {
  onSelectionChange?: (selectedItems: HostedZone[]) => void;
  onDeleteClick?: (selectedItems: HostedZone[]) => void;
}

export function HostedZoneTable({ onSelectionChange, onDeleteClick }: HostedZoneTableProps = {}) {
  const router = useRouter();
  const { hostedZones } = useHostedZones();
  
  const columnDefinitions = React.useMemo(() => [
    {
      id: 'name',
      header: 'Hosted zone name',
      cell: (item: HostedZone) => (
        <Link 
          href={`/hosted-zones/${item.id}`} 
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

  const items = USE_EMPTY_STATE ? [] : hostedZones;

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
              <span className="aws-yellow-button">
                <Button onClick={() => router.push('/hosted-zones/new')} variant="primary">
                  Create hosted zone
                </Button>
              </span>
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

  const selectedItems = (collectionProps.selectedItems as HostedZone[]) || [];
  const isSelectionEmpty = selectedItems.length === 0;

  React.useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItems);
    }
  }, [selectedItems, onSelectionChange]);

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
            <span className="aws-yellow-button">
              <Button onClick={() => router.push('/hosted-zones/new')} variant="primary">
                Create hosted zone
              </Button>
            </span>
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
              <Button 
                disabled={isSelectionEmpty}
                onClick={() => router.push(`/hosted-zones/${selectedItems[0].id}`)}
              >
                View details
              </Button>
              <Button 
                disabled={isSelectionEmpty}
                onClick={() => router.push(`/hosted-zones/${selectedItems[0].id}/edit`)}
              >
                Edit
              </Button>
              <Button 
                disabled={isSelectionEmpty}
                onClick={() => onDeleteClick && onDeleteClick(selectedItems)}
              >
                Delete
              </Button>
              <span className="aws-yellow-button">
                <Button
                  variant="primary"
                  onClick={() => router.push('/hosted-zones/new')}
                >
                  Create hosted zone
                </Button>
              </span>
            </SpaceBetween>
          }
        >
          Hosted zones
        </Header>
      }
    />
  );
}
