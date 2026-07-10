"use client";

import React from 'react';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { usePathname, useRouter } from 'next/navigation';
import { NAVIGATION_ITEMS } from '../../constants/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const items: SideNavigationProps.Item[] = NAVIGATION_ITEMS.map((item) => ({
    type: 'link',
    text: item.text,
    href: item.href,
    iconName: item.iconName,
  }));

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
