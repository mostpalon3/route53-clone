import React from 'react';
import { Container, Header, Box, Button, SpaceBetween, Grid, Icon } from '@cloudscape-design/components';
import { IconProps } from '@cloudscape-design/components/icon';

interface FeatureCardProps {
  iconName: IconProps.Name;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

function FeatureCard({ iconName, title, description, buttonText, href }: FeatureCardProps) {
  return (
    <Container>
      <SpaceBetween direction="vertical" size="m" alignItems="center">
        <SpaceBetween direction="vertical" size="s" alignItems="center">
          <Icon name={iconName} size="large" variant="normal" />
          <Box variant="h3" textAlign="center" fontWeight="bold">{title}</Box>
          <Box variant="p" textAlign="center" color="text-body-secondary">
            {description}
          </Box>
        </SpaceBetween>
        <Button href={href}>{buttonText}</Button>
      </SpaceBetween>
    </Container>
  );
}

export function FeatureCards() {
  const features: FeatureCardProps[] = [
    {
      iconName: 'settings',
      title: 'Get Started',
      description: 'Quickly set up your domain and routing configurations.',
      buttonText: 'Get started',
      href: '/dashboard',
    },
    {
      iconName: 'ticket',
      title: 'Pricing',
      description: 'View transparent, pay-as-you-go pricing for all Route 53 features.',
      buttonText: 'View pricing',
      href: '#',
    },
    {
      iconName: 'treeview-expand',
      title: 'Hosted Zones',
      description: 'A hosted zone tells Route 53 how to respond to DNS queries for a domain.',
      buttonText: 'Create hosted zone',
      href: '/hosted-zones',
    },
    {
      iconName: 'share',
      title: 'Traffic Flow',
      description: 'A visual tool that lets you easily create policies for multiple endpoints.',
      buttonText: 'Create policy',
      href: '/traffic-policies',
    },
    {
      iconName: 'status-positive',
      title: 'Health Checks',
      description: 'Monitor your applications and direct DNS queries to healthy resources.',
      buttonText: 'Create health check',
      href: '/health-checks',
    },
    {
      iconName: 'multiscreen',
      title: 'Resolver',
      description: 'Configure DNS resolution between your VPC and on-premises networks.',
      buttonText: 'Configure resolver',
      href: '/resolver',
    }
  ];

  return (
    <SpaceBetween direction="vertical" size="l">
      <Header variant="h2">Features</Header>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6, m: 4, l: 4 } },
          { colspan: { default: 12, xs: 6, m: 4, l: 4 } },
          { colspan: { default: 12, xs: 6, m: 4, l: 4 } },
          { colspan: { default: 12, xs: 6, m: 4, l: 4 } },
          { colspan: { default: 12, xs: 6, m: 4, l: 4 } },
          { colspan: { default: 12, xs: 6, m: 4, l: 4 } },
        ]}
      >
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </Grid>
    </SpaceBetween>
  );
}
