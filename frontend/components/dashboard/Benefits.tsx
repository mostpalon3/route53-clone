import React from 'react';
import { Container, Header, Box, SpaceBetween, Grid, Icon } from '@cloudscape-design/components';
import { IconProps } from '@cloudscape-design/components/icon';

interface BenefitCardProps {
  iconName: IconProps.Name;
  title: string;
  description: string;
}

function BenefitCard({ iconName, title, description }: BenefitCardProps) {
  return (
    <Container>
      <SpaceBetween direction="vertical" size="s" alignItems="center">
        <Box color="text-status-info">
          <Icon name={iconName} size="large" variant="normal" />
        </Box>
        <Box variant="h3" fontWeight="bold">{title}</Box>
        <Box variant="p" textAlign="center" color="text-body-secondary">{description}</Box>
      </SpaceBetween>
    </Container>
  );
}

export function Benefits() {
  const benefits: BenefitCardProps[] = [
    {
      iconName: 'status-positive',
      title: 'Highly Available',
      description: 'Built on AWS’s highly available and reliable infrastructure.'
    },
    {
      iconName: 'expand',
      title: 'Scalable',
      description: 'Automatically scales to handle large query volumes without your intervention.'
    },
    {
      iconName: 'security',
      title: 'Secure',
      description: 'Integrates with AWS IAM to control who can update your DNS data.'
    },
    {
      iconName: 'status-in-progress',
      title: 'Fast DNS',
      description: 'Routes users to the optimal endpoint based on network conditions.'
    }
  ];

  return (
    <SpaceBetween direction="vertical" size="l">
      <Header variant="h2">Benefits</Header>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
          { colspan: { default: 12, xs: 6, m: 3, l: 3 } },
        ]}
      >
        {benefits.map((benefit, idx) => (
          <BenefitCard key={idx} {...benefit} />
        ))}
      </Grid>
    </SpaceBetween>
  );
}
