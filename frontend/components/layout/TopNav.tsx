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
            src: "/assets/aws.svg",
            alt: "AWS"
          }
        }}
        search={
          <div style={{ position: 'fixed', top: '8px', left: '72px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1000 }}>
            {/* Amazon Q Icon */}
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="url(#q-gradient)" />
                <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="white" strokeWidth="2"/>
                <path d="M15 15L17.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="2" fill="white"/>
                <defs>
                  <linearGradient id="q-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7E3AF2" />
                    <stop offset="1" stopColor="#0073BB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Grid Icon */}
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px' }}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="#aab7b8">
                <path d="M1.5 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V2zM1.5 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V7zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V7zM1.5 12a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-2zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2z" />
              </svg>
            </div>
            {/* Search Input */}
            <div style={{ 
              width: '500px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#16191f', 
              border: '1px solid #5f6b7a',
              borderRadius: '16px',
              padding: '0 12px',
              height: '32px'
            }}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="#aab7b8" style={{ marginRight: '8px' }}>
                <path d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415zM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0-2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search" 
                style={{ 
                  flex: 1, 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  color: '#eaeded', 
                  outline: 'none',
                  fontSize: '14px',
                  fontStyle: 'italic'
                }} 
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aab7b8', fontSize: '12px' }}>
                <span>[Option+S]</span>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-2A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm.75-5.32l2.36 1.36-.75 1.3-3.11-1.8V4.5h1.5v3.18z"/>
                </svg>
              </div>
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
            text: user ? `${user.name} (926028309602)` : "mostpalon3 (926028309602)",
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
