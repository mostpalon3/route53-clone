import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  SpaceBetween, 
  Button, 
  Table, 
  TextFilter 
} from '@cloudscape-design/components';
import { DnsRecord } from '@/mock/records';
import { useCollection } from '@cloudscape-design/collection-hooks';

interface DeleteRecordModalProps {
  visible: boolean;
  onDismiss: () => void;
  onDelete: () => void;
  recordsToDelete: DnsRecord[];
}

export function DeleteRecordModal({ visible, onDismiss, onDelete, recordsToDelete }: DeleteRecordModalProps) {
  const isMultiple = recordsToDelete.length > 1;

  const { items, filterProps, collectionProps } = useCollection(recordsToDelete, {
    filtering: {
      empty: (
        <Box textAlign="center" color="inherit">
          <b>No records</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No records to display.
          </Box>
        </Box>
      ),
      noMatch: (
        <Box textAlign="center" color="inherit">
          <b>No matches</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            We can't find a match.
          </Box>
        </Box>
      ),
    },
    sorting: {},
  });

  return (
    <Modal
      onDismiss={onDismiss}
      visible={visible}
      header={isMultiple ? "Delete selected records?" : "Delete selected record?"}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>Cancel</Button>
            <Button variant="primary" onClick={onDelete} className="aws-danger-button">Delete</Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Box variant="p">
          {isMultiple ? "Delete these records permanently? This action cannot be undone. Your domain might become unavailable on the internet." : "Delete the record permanently? This action cannot be undone. Your domain might become unavailable on the internet."}
        </Box>

        <Table
          {...collectionProps}
          items={items}
          variant="embedded"
          filter={
            <TextFilter
              {...filterProps}
              filteringPlaceholder="Search"
            />
          }
          columnDefinitions={[
            {
              id: 'name',
              header: 'Record name',
              cell: item => item.name
            },
            {
              id: 'type',
              header: 'Type',
              cell: item => item.type
            },
            {
              id: 'value',
              header: 'Value/Route traffic to',
              cell: item => item.value
            }
          ]}
        />
      </SpaceBetween>
    </Modal>
  );
}
