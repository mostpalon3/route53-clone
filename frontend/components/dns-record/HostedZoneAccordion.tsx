"use client";

import React from 'react';
import { ExpandableSection, ColumnLayout, Box, Button } from '@cloudscape-design/components';

interface HostedZoneAccordionProps {
  zoneName: string;
}

export function HostedZoneAccordion({ zoneName }: HostedZoneAccordionProps) {
  return (
    <ExpandableSection
      headerText="Hosted zone details"
      headerActions={<Button>Edit hosted zone</Button>}
      defaultExpanded={false}
    >
      <ColumnLayout columns={4} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Hosted zone ID</Box>
          <div>Z04D3Q382T08ABCDEFGH1</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Created by</Box>
          <div>arn:aws:iam::926028309602:user/mostpalon3</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Type</Box>
          <div>Public</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Record count</Box>
          <div>6</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Comment</Box>
          <div>-</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Creation date</Box>
          <div>July 10, 2026, 12:00:00 (UTC+05:30)</div>
        </div>
      </ColumnLayout>
    </ExpandableSection>
  );
}
