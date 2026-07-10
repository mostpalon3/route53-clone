import React from 'react';
import { Container, Header, Table, Box, Button, Input } from '@cloudscape-design/components';

export function Notifications() {
  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={<Button iconName="refresh" variant="icon" />}
        >
          Notifications
        </Header>
      }
    >
      <Table
        columnDefinitions={[
          {
            id: 'resource',
            header: 'Resource',
            cell: item => item.resource,
          },
          {
            id: 'status',
            header: 'Status',
            cell: item => item.status,
          },
          {
            id: 'lastUpdate',
            header: 'Last update',
            cell: item => item.lastUpdate,
          },
        ]}
        items={[]}
        empty={
          <Box textAlign="center" color="text-body-secondary">
            <b>No notifications to display</b>
          </Box>
        }
        filter={
          <Input
            type="search"
            placeholder="Find notifications"
            value=""
            onChange={() => {}}
            clearAriaLabel="Clear"
          />
        }
        pagination={<Box textAlign="right" padding={{ top: 'xs' }}>&lt; 1 &gt;</Box>}
      />
    </Container>
  );
}
