import { api } from '../lib/api';

export interface HostedZoneCreate {
  domain_name: string;
  description?: string;
  zone_type?: string;
}

export interface HostedZoneResponse {
  id: number;
  zone_id: string;
  domain_name: string;
  description: string;
  zone_type: string;
  record_count: number;
  created_at: string;
  updated_at: string;
}

export const hostedZoneService = {
  async getHostedZones(): Promise<HostedZoneResponse[]> {
    const res = await api.get('/api/hosted-zones');
    return res.data.data;
  },

  async createHostedZone(data: HostedZoneCreate): Promise<HostedZoneResponse> {
    const res = await api.post('/api/hosted-zones', data);
    return res.data.data;
  },

  async deleteHostedZone(id: number): Promise<void> {
    await api.delete(`/api/hosted-zones/${id}`);
  }
};
