"use client";

import React from 'react';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import Badge from '@cloudscape-design/components/badge';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const items: SideNavigationProps.Item[] = [
    { type: 'link', text: 'Dashboard', href: '/dashboard' },
    { type: 'link', text: 'Hosted zones', href: '/hosted-zones' },
    { type: 'link', text: 'Health checks', href: '/coming-soon' },
    { type: 'link', text: 'Profiles', href: '/coming-soon' },
    {
      type: 'section',
      text: 'Global Resolver',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Global resolvers', href: '/coming-soon', info: <Badge color="blue">New</Badge> },
        { type: 'link', text: 'Shared DNS views', href: '/coming-soon', info: <Badge color="blue">New</Badge> },
      ]
    },
    {
      type: 'section',
      text: 'VPC Resolver',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'VPCs', href: '/coming-soon' },
        { type: 'link', text: 'Inbound endpoints', href: '/coming-soon' },
        { type: 'link', text: 'Outbound endpoints', href: '/coming-soon' },
        { type: 'link', text: 'Rules', href: '/coming-soon' },
        { type: 'link', text: 'Query logging', href: '/coming-soon' },
        { type: 'link', text: 'Outposts', href: '/coming-soon' },
      ]
    },
    {
      type: 'section',
      text: 'Domains',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Registered domains', href: '/coming-soon' },
        { type: 'link', text: 'Requests', href: '/coming-soon' },
      ]
    },
    {
      type: 'section',
      text: 'IP-based routing',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'CIDR collections', href: '/coming-soon' },
      ]
    },
    {
      type: 'section',
      text: 'Traffic flow',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Traffic policies', href: '/coming-soon' },
        { type: 'link', text: 'Policy records', href: '/coming-soon' },
      ]
    },
    { type: 'divider' },
    { type: 'link', text: 'DNS Firewall', href: 'https://aws.amazon.com/route53/resolver/dns-firewall/', external: true },
    { type: 'link', text: 'Application Recovery Controller', href: 'https://aws.amazon.com/route53/application-recovery-controller/', external: true },
  ];

  return (
    <SideNavigation
      activeHref={pathname}
      header={{ href: '/', text: 'Route 53' }}
      onFollow={(event) => {
        if (!event.detail.external) {
          event.preventDefault();
          router.push(event.detail.href);
        }
      }}
      items={items}
    />
  );
}
