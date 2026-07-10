"use client";

import React from 'react';
import { Header, Badge, Button, SpaceBetween, Box } from '@cloudscape-design/components';

interface HostedZoneHeaderProps {
  zoneName: string;
}

export function HostedZoneHeader({ zoneName }: HostedZoneHeaderProps) {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button>Delete zone</Button>
          <Button>Test record</Button>
          <Button>Configure query logging</Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <Badge color="blue">Public</Badge>
        <span style={{ fontSize: '24px', fontWeight: 700 }}>{zoneName}</span>
        <Box color="text-status-info" variant="small">Info</Box>
      </SpaceBetween>
    </Header>
  );
}
