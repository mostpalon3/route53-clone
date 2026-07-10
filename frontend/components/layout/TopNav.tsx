"use client";

import React from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';

export function TopNav() {
  return (
    <TopNavigation
      identity={{
        href: "/dashboard",
        title: "Route 53",
        logo: {
          src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
          alt: "AWS Logo"
        }
      }}
      utilities={[
        {
          type: "button",
          iconName: "search",
          text: "Search",
          ariaLabel: "Search"
        },
        {
          type: "button",
          iconName: "notification",
          text: "Notifications",
          ariaLabel: "Notifications"
        },
        {
          type: "button",
          text: "Help",
          ariaLabel: "Help"
        },
        {
          type: "menu-dropdown",
          text: "Global",
          description: "Global region",
          iconName: "globe",
          items: [
            { id: "global", text: "Global" }
          ]
        },
        {
          type: "menu-dropdown",
          text: "User",
          description: "user@example.com",
          iconName: "user-profile",
          items: [
            { id: "profile", text: "Profile" },
            { id: "logout", text: "Sign out" }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
  );
}
