import React from 'react';
import { Box, SpaceBetween, Link } from '@cloudscape-design/components';

export function Footer() {
  return (
    <Box padding={{ vertical: 'l', horizontal: 'xxl' }} variant="div">
      <div style={{ borderTop: '1px solid #eaeded', margin: '20px 0' }} />
      <SpaceBetween direction="horizontal" size="l" justifyContent="space-between">
        <SpaceBetween direction="horizontal" size="l">
          <Link href="#" variant="secondary">CloudShell</Link>
          <Link href="#" variant="secondary">Feedback</Link>
          <Link href="#" variant="secondary">Console mobile app</Link>
        </SpaceBetween>
        <SpaceBetween direction="horizontal" size="l">
          <Box variant="p" color="text-body-secondary" display="inline">
            © 2026, Amazon Web Services, Inc. or its affiliates.
          </Box>
          <Link href="#" variant="secondary">Privacy</Link>
          <Link href="#" variant="secondary">Terms</Link>
          <Link href="#" variant="secondary">Cookie preferences</Link>
          <Link href="#" variant="secondary">Support</Link>
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
}
