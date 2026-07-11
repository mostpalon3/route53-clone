"use client";

import React from 'react';
import { createPortal } from 'react-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { Input, Box, SpaceBetween, Select, RadioGroup, Link, Container } from '@cloudscape-design/components';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

export function TopNav() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const [showSettings, setShowSettings] = React.useState(false);
  const [visualMode, setVisualMode] = React.useState('browser');

  React.useEffect(() => {
    const savedMode = localStorage.getItem('visual-mode') || 'browser';
    setVisualMode(savedMode);
    applyVisualMode(savedMode);
  }, []);

  function applyVisualMode(mode: string) {
    if (mode === 'dark') {
      applyMode(Mode.Dark);
    } else if (mode === 'light') {
      applyMode(Mode.Light);
    } else {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyMode(isDark ? Mode.Dark : Mode.Light);
    }
  }

  const handleVisualModeChange = (mode: string) => {
    setVisualMode(mode);
    localStorage.setItem('visual-mode', mode);
    applyVisualMode(mode);
  };

  const handleUtilityClick = async (event: CustomEvent<{ id: string }>) => {
    if (event.detail.id === 'logout') {
      await logout();
      router.push('/login');
    }
  };

  return (
    <>
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
                onChange={() => { }}
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
            ariaLabel: "Settings",
            onClick: () => setShowSettings(!showSettings)
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
            ],
            onItemClick: handleUtilityClick
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
      {showSettings && typeof document !== 'undefined' && createPortal(
        <>
          <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10001 }}
            onClick={() => setShowSettings(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: '48px',
              right: '120px',
              width: '320px',
              zIndex: 10002,
            }}
          >
            <Container disableContentPaddings={true}>
              <Box padding="m">
              <Box variant="h3" padding={{ bottom: 'm' }}>Current user settings</Box>
              <div style={{ borderBottom: '1px solid var(--color-border-divider-default, #414d5c)', margin: '0 -16px 16px -16px' }} />

              <SpaceBetween size="l">
                <div>
                  <Box variant="awsui-key-label" padding={{ bottom: 'xxs' }}>Language</Box>
                  <Select
                    selectedOption={{ label: 'Browser default', value: 'browser' }}
                    onChange={() => { }}
                    options={[{ label: 'Browser default', value: 'browser' }]}
                  />
                </div>

                <div>
                  <Box variant="awsui-key-label" padding={{ bottom: 'xxs' }}>
                    Visual mode - <i>beta</i>
                  </Box>
                  <RadioGroup
                    onChange={({ detail }) => handleVisualModeChange(detail.value)}
                    value={visualMode}
                    items={[
                      { value: 'browser', label: 'Browser default' },
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' }
                    ]}
                  />
                </div>
              </SpaceBetween>

              <div style={{ borderBottom: '1px solid var(--color-border-divider-default, #414d5c)', margin: '16px -16px 16px -16px' }} />

              <SpaceBetween size="m">
                <Link variant="primary">See all user settings</Link>
                <Link variant="primary">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    AWS experimental preview
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                      <path d="M12.92 11.23L10 6V3h1V2H5v1h1v3L3.08 11.23A2.5 2.5 0 0 0 5 15h6a2.5 2.5 0 0 0 1.92-3.77zM11.16 11H4.84l1.62-2.92A1.5 1.5 0 0 0 6.64 7V3h2.72v4a1.5 1.5 0 0 0 .18 1.08z" />
                      <circle cx="8" cy="11.5" r="1" />
                    </svg>
                  </span>
                </Link>
              </SpaceBetween>
              </Box>
            </Container>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
