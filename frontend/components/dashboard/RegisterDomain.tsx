import React, { useState } from 'react';
import { Container, Header, SpaceBetween, Input, Button, Box, FormField, Link } from '@cloudscape-design/components';

export function RegisterDomain() {
  const [domainName, setDomainName] = useState('');

  return (
    <Container header={<Header variant="h2">Register domain</Header>}>
      <SpaceBetween direction="vertical" size="s">
        <Box variant="p">
          Find and register an available domain, or <Link href="#">transfer your existing domains</Link> to Route 53.
        </Box>
        <FormField
          description="Each label (each part between dots) can be up to 63 characters long and must start with a-z or 0-9. Maximum length: 255 characters, including dots. Valid characters: a-z, 0-9, and - (hyphen)"
        >
          <Input
            value={domainName}
            onChange={({ detail }) => setDomainName(detail.value)}
            placeholder="Enter a domain name"
          />
        </FormField>
        <Button>Check</Button>
      </SpaceBetween>
    </Container>
  );
}
