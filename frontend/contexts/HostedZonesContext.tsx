"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { hostedZoneService, HostedZoneResponse, HostedZoneCreate } from '@/services/hostedZoneService';
import { authService } from '@/services/authService';
import { loadToken } from '@/lib/auth';

// Keep the UI interface loosely similar so we don't break existing components too badly yet, 
// or map it properly. The backend returns id (number), zone_id, domain_name, etc.
// Let's adapt HostedZoneResponse to fit what the table expects, or just use HostedZoneResponse.
// The existing table expects: id, name, type, recordCount, comment

export interface HostedZone {
  id: string; // The backend zone_id e.g. Z123456
  pk: number; // The backend primary key
  name: string;
  type: string;
  recordCount: number;
  description: string;
  createdBy: string;
  tags?: any[];
}

interface HostedZonesContextType {
  hostedZones: HostedZone[];
  addHostedZone: (zoneData: HostedZoneCreate) => Promise<void>;
  updateHostedZone: (pk: number, description: string) => Promise<void>;
  deleteHostedZone: (pk: number) => Promise<void>;
  isLoading: boolean;
}

const HostedZonesContext = createContext<HostedZonesContextType | undefined>(undefined);

export function HostedZonesProvider({ children }: { children: ReactNode }) {
  const [hostedZones, setHostedZones] = useState<HostedZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchZones = async () => {
    setIsLoading(true);
    try {
      // Auto-login for development/testing if no token exists
      if (!loadToken()) {
        console.log('No token found, auto-logging in as default admin...');
        await authService.login('admin@example.com', 'password123');
      }

      const data = await hostedZoneService.getHostedZones();
      const mapped: HostedZone[] = data.map(z => ({
        id: z.zone_id,
        pk: z.id,
        name: z.domain_name,
        type: z.zone_type,
        recordCount: z.record_count,
        description: z.description || '',
        createdBy: 'arn:aws:iam::123456789012:user/admin'
      }));
      setHostedZones(mapped);
    } catch (e) {
      console.error("Failed to load hosted zones", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const addHostedZone = async (zoneData: HostedZoneCreate) => {
    await hostedZoneService.createHostedZone(zoneData);
    await fetchZones(); // Refresh the list
  };

  const updateHostedZone = async (pk: number, description: string) => {
    await hostedZoneService.updateHostedZone(pk, { description });
    await fetchZones(); // Refresh the list
  };

  const deleteHostedZone = async (pk: number) => {
    await hostedZoneService.deleteHostedZone(pk);
    await fetchZones(); // Refresh the list
  };

  return (
    <HostedZonesContext.Provider value={{ hostedZones, addHostedZone, updateHostedZone, deleteHostedZone, isLoading }}>
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
