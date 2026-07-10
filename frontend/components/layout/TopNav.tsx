"use client";

import React from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { Input } from '@cloudscape-design/components';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function TopNav() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleUtilityClick = async (event: any) => {
    if (event.detail.id === 'logout') {
      await logout();
      router.push('/login');
    }
  };

  return (
    <TopNavigation
      identity={{
        href: "/",
        logo: {
          src: "/assets/aws.png",
          alt: "AWS"
        }
      }}
      search={
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '500px', paddingLeft: '8px' }}>
          <img src="/assets/route53.svg" alt="Route 53" style={{ width: '28px', height: '28px' }} />
          <div style={{ cursor: 'pointer', padding: '4px', borderRadius: '4px' }}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="white">
              <path d="M1.5 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V2zM1.5 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V7zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V7zM1.5 12a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <Input
              type="search"
              placeholder="Search"
              ariaLabel="Search"
              value=""
              onChange={() => {}}
            />
          </div>
        </div>
      }
      utilities={[
        {
          type: "button",
          iconName: "command-prompt",
          ariaLabel: "CloudShell",
          title: "CloudShell"
        },
        {
          type: "button",
          iconName: "notification",
          ariaLabel: "Notifications"
        },
        {
          type: "button",
          iconName: "support",
          ariaLabel: "Support"
        },
        {
          type: "button",
          iconName: "settings",
          ariaLabel: "Settings"
        },
        {
          type: "menu-dropdown",
          text: "Global",
          items: [{ id: "global", text: "Global" }]
        },
        {
          type: "menu-dropdown",
          text: user ? user.name : "mostpalon3",
          description: user ? user.username : "mostpalon3",
          items: [
            { id: "profile", text: "Profile" },
            { id: "logout", text: "Sign out" }
          ]
        }
      ]}
      onUtilityClick={handleUtilityClick}
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
