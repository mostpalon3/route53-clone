"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HostedZone, MOCK_HOSTED_ZONES } from '@/mock/hostedZones';

interface HostedZonesContextType {
  hostedZones: HostedZone[];
  addHostedZone: (zone: HostedZone) => void;
  updateHostedZone: (id: string, updatedZone: HostedZone) => void;
  deleteHostedZone: (id: string) => void;
}

const HostedZonesContext = createContext<HostedZonesContextType | undefined>(undefined);

export function HostedZonesProvider({ children }: { children: ReactNode }) {
  const [hostedZones, setHostedZones] = useState<HostedZone[]>(MOCK_HOSTED_ZONES);

  const addHostedZone = (zone: HostedZone) => {
    setHostedZones(prev => [...prev, zone]);
  };

  const updateHostedZone = (id: string, updatedZone: HostedZone) => {
    setHostedZones(prev => prev.map(zone => (zone.id === id ? updatedZone : zone)));
  };

  const deleteHostedZone = (id: string) => {
    setHostedZones(prev => prev.filter(zone => zone.id !== id));
  };

  return (
    <HostedZonesContext.Provider value={{ hostedZones, addHostedZone, updateHostedZone, deleteHostedZone }}>
      {children}
    </HostedZonesContext.Provider>
  );
}

export function useHostedZones() {
  const context = useContext(HostedZonesContext);
  if (context === undefined) {
    throw new Error('useHostedZones must be used within a HostedZonesProvider');
  }
  return context;
}
