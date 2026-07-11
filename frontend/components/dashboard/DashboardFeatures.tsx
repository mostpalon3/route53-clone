"use client";

import React from 'react';
import { Container, Box, Button, SpaceBetween, Grid } from '@cloudscape-design/components';
import { useHostedZones } from '@/contexts/HostedZonesContext';
import Link from 'next/link';

export function DashboardFeatures() {
  const { hostedZones } = useHostedZones();
  const zoneCount = hostedZones.length;

  return (
    <Container>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
        ]}
      >
        <Box textAlign="center" padding={{ vertical: 's', horizontal: 'l' }}>
          <SpaceBetween direction="vertical" size="m" alignItems="center">
            <Box variant="h3" fontWeight="bold">DNS management</Box>
            <Box variant="p" color="text-body-secondary" textAlign="center">
              A hosted zone tells Route 53 how to respond to DNS queries for a domain such as example.com.
            </Box>
            {zoneCount > 0 ? (
              <Box textAlign="center">
                <Link href="/hosted-zones" style={{ textDecoration: 'none' }}>
                  <Box color="text-status-info" fontSize="display-l" fontWeight="bold">
                    {zoneCount}
                  </Box>
                </Link>
                <Box color="text-body-secondary">Hosted zones</Box>
              </Box>
            ) : (
              <span className="aws-yellow-button">
                <Button variant="primary" href="/hosted-zones">Create hosted zone</Button>
              </span>
            )}
          </SpaceBetween>
        </Box>

        <Box textAlign="center" padding={{ vertical: 's', horizontal: 'l' }}>
          <SpaceBetween direction="vertical" size="m" alignItems="center">
            <Box variant="h3" fontWeight="bold">Availability monitoring</Box>
            <Box variant="p" color="text-body-secondary" textAlign="center">
              Health checks monitor your applications and web resources, and direct DNS queries to healthy resources.
            </Box>
            <Button href="/health-checks">Create health check</Button>
          </SpaceBetween>
        </Box>

        <Box textAlign="center" padding={{ vertical: 's', horizontal: 'l' }}>
          <SpaceBetween direction="vertical" size="m" alignItems="center">
            <Box variant="h3" fontWeight="bold">Traffic management</Box>
            <Box variant="p" color="text-body-secondary" textAlign="center">
              A visual tool that lets you easily create policies for multiple endpoints in complex configurations.
            </Box>
            <Button href="/traffic-policies">Create policy</Button>
          </SpaceBetween>
        </Box>

        <Box textAlign="center" padding={{ vertical: 's', horizontal: 'l' }}>
          <SpaceBetween direction="vertical" size="m" alignItems="center">
            <Box variant="h3" fontWeight="bold">Domain registration</Box>
            <Box>
              <Box color="text-status-error" fontSize="heading-l" fontWeight="bold">Error</Box>
              <Box color="text-body-secondary">Domains</Box>
            </Box>
          </SpaceBetween>
        </Box>
      </Grid>
    </Container>
  );
}
