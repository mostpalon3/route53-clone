import { api } from '../lib/api';

export interface DnsRecordResponse {
  id: number;
  record_id: string;
  hosted_zone_id: string;
  record_name: string;
  record_type: string;
  routing_policy: string;
  set_identifier?: string;
  alias: boolean;
  ttl?: number;
  value: string;
  health_check_id?: string;
  evaluate_target_health: boolean;
  created_at: string;
  updated_at: string;
}

export interface DnsRecordCreate {
  record_name: string;
  record_type: string;
  routing_policy: string;
  set_identifier?: string;
  alias: boolean;
  ttl?: number;
  value: string;
  health_check_id?: string;
  evaluate_target_health: boolean;
}

export const dnsRecordService = {
  async getRecords(hostedZoneId: number): Promise<DnsRecordResponse[]> {
    const res = await api.get(`/api/hosted-zones/${hostedZoneId}/records`);
    return res.data.data;
  },

  async createRecord(hostedZoneId: number, data: DnsRecordCreate): Promise<DnsRecordResponse> {
    const res = await api.post(`/api/hosted-zones/${hostedZoneId}/records`, data);
    return res.data.data;
  },

  async updateRecord(hostedZoneId: number, recordId: number, data: DnsRecordCreate): Promise<DnsRecordResponse> {
    const res = await api.put(`/api/records/${recordId}`, data);
    return res.data.data;
  },

  async deleteRecord(hostedZoneId: number, recordId: number): Promise<void> {
    await api.delete(`/api/records/${recordId}`);
  }
};
