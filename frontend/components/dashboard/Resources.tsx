import React from 'react';
import { Container, Header, Link, SpaceBetween, Icon } from '@cloudscape-design/components';

export function Resources() {
  return (
    <Container header={<Header variant="h2" info={<a href="#" target="_blank"><Icon name="external" /></a>}>More resources</Header>}>
      <SpaceBetween direction="vertical" size="m">
        <Link href="#" external>Documentation</Link>
        <Link href="#" external>API reference</Link>
        <Link href="#" external>FAQs</Link>
        <Link href="#" external>Forum - DNS and health checks</Link>
      </SpaceBetween>
    </Container>
  );
}
