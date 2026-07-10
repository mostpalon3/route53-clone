import React from 'react';
import { Box, Button, Container, SpaceBetween, Header } from '@cloudscape-design/components';

export function Hero() {
  return (
    <Container>
      <Box padding={{ top: 'xxl', bottom: 'xxl', horizontal: 'l' }} textAlign="center">
        <SpaceBetween direction="vertical" size="xl" alignItems="center">
          <SpaceBetween direction="vertical" size="m" alignItems="center">
            <Box variant="h1" fontWeight="bold">Amazon Route 53</Box>
            <Box variant="p" color="text-body-secondary">
              A reliable and cost-effective way to route end users to Internet applications.
            </Box>
          </SpaceBetween>
          <SpaceBetween direction="horizontal" size="s">
            <Button variant="primary" href="/hosted-zones">Get started</Button>
            <Button href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html" target="_blank" iconAlign="right" iconName="external">
              Documentation
            </Button>
          </SpaceBetween>
        </SpaceBetween>
      </Box>
    </Container>
  );
}
