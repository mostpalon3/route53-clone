"use client";

import React, { useState, useEffect } from 'react';
import { AppLayout, Button, Icon, SpaceBetween } from '@cloudscape-design/components';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import '@cloudscape-design/global-styles/index.css';

interface AppShellProps {
    children: React.ReactNode;
    breadcrumbs?: React.ReactNode;
    contentType?: 'default' | 'table' | 'form' | 'cards' | 'wizard';
    splitPanel?: React.ReactNode;
    splitPanelOpen?: boolean;
    onSplitPanelToggle?: (event: any) => void;
    splitPanelSize?: number;
    onSplitPanelResize?: (event: any) => void;
    splitPanelPreferences?: any;
    onSplitPanelPreferencesChange?: (event: any) => void;
}

export function AppShell({
    children,
    breadcrumbs,
    contentType,
    splitPanel,
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
    splitPanelPreferences,
    onSplitPanelPreferencesChange,
}: AppShellProps) {
    const [navigationOpen, setNavigationOpen] = useState(true);

    // Remember collapsed state using localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('route53-sidebar-open');
        if (savedState !== null) {
            setNavigationOpen(savedState === 'true');
        }
    }, []);

    const handleNavigationChange = (e: any) => {
        setNavigationOpen(e.detail.open);
        localStorage.setItem('route53-sidebar-open', String(e.detail.open));
    };

    return (
        <>
            <div id="top-nav" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
                <TopNav />
                {breadcrumbs && (
                    <div style={{
                        backgroundColor: '#171D25',
                        padding: '8px 24px',
                        borderBottom: '1px solid #414d5c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div
                                style={{
                                    backgroundColor: '#3b99fc',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setNavigationOpen(!navigationOpen)}
                            >
                                <Icon name="menu" variant="inverted" />
                            </div>
                            {breadcrumbs}
                        </div>
                        <SpaceBetween direction="horizontal" size="s">
                            <Button iconName="copy" variant="inline-icon" ariaLabel="Copy" />
                            <Button iconName="status-info" variant="inline-icon" ariaLabel="Info" />
                        </SpaceBetween>
                    </div>
                )}
            </div>
            <div style={{ paddingBottom: '40px' }} className="hide-default-applayout-toggle">
                <AppLayout
                    navigationOpen={navigationOpen}
                    onNavigationChange={handleNavigationChange}
                    navigation={<Sidebar />}
                    content={children}
                    contentType={contentType}
                    splitPanel={splitPanel}
                    splitPanelOpen={splitPanelOpen}
                    onSplitPanelToggle={onSplitPanelToggle}
                    splitPanelSize={splitPanelSize}
                    onSplitPanelResize={onSplitPanelResize}
                    splitPanelPreferences={splitPanelPreferences}
                    onSplitPanelPreferencesChange={onSplitPanelPreferencesChange}
                    toolsHide={true}
                    headerSelector="#top-nav"
                />
            </div>
            <Footer />
        </>
    );
}
