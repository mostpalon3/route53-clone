import { DnsRecord } from '@/mock/records';

export interface RecordFormData {
  name: string;
  type: string;
  ttl: string;
  routingPolicy: string;
  isAlias: boolean;
  value: string;
  comment?: string;
}

export const createDnsRecord = (data: RecordFormData, rootDomain: string): DnsRecord => {
  const fullDomainName = data.name.trim() === '' ? rootDomain : `${data.name.trim()}.${rootDomain}`;
  
  return {
    id: `rec-${Math.random().toString(36).substring(2, 9)}`,
    name: fullDomainName,
    type: data.type,
    routingPolicy: data.routingPolicy,
    difference: '-',
    alias: data.isAlias ? 'Yes' : 'No',
    value: data.value,
    ttl: data.ttl,
  };
};
