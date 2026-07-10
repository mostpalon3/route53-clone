import React from 'react';
import { Icon } from '@cloudscape-design/components';

export function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      backgroundColor: '#0f1b2a',
      borderTop: '1px solid #1f2a37',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      fontSize: '12px',
      color: '#9ca3af',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a href="#" style={{ color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Icon name="command-prompt" size="small" /> CloudShell
        </a>
        <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Feedback</a>
        <a href="#" style={{ color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M4 1.5A1.5 1.5 0 0 1 5.5 0h5A1.5 1.5 0 0 1 12 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 14.5v-13zm1.5-.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-5zM8 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          Console mobile app
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span>© 2026, Amazon Web Services, Inc. or its affiliates.</span>
        <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Privacy</a>
        <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Terms</a>
        <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Cookie preferences</a>
      </div>
    </footer>
  );
}
