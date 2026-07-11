export interface DnsRecord {
  id: string; // Keep as string for Cloudscape table selection
  record_id: string;
  name: string;
  type: string;
  routingPolicy: string;
  setIdentifier: string;
  alias: string;
  value: string;
  ttl: string;
  healthCheckId: string;
  evaluateTargetHealth: string;
  comment?: string;
}

export const MOCK_RECORDS: DnsRecord[] = [
  {
    id: 'rec-1',
    record_id: 'abc-123',
    name: 'textinsightpro.netlify.app',
    type: 'NS',
    routingPolicy: 'Simple',
    setIdentifier: '-',
    alias: 'No',
    value: 'ns-733.awsdns-27.net.\nns-126.awsdns-15.com.\nns-1314.awsdns-36.org.\nns-1618.awsdns-10.co.uk.',
    ttl: '172,800',
    healthCheckId: '-',
    evaluateTargetHealth: 'No'
  },
  {
    id: 'rec-2',
    record_id: 'abc-124',
    name: 'textinsightpro.netlify.app',
    type: 'SOA',
    routingPolicy: 'Simple',
    setIdentifier: '-',
    alias: 'No',
    value: 'ns-733.awsdns-27.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400',
    ttl: '900',
    healthCheckId: '-',
    evaluateTargetHealth: 'No'
  },
  {
    id: 'rec-3',
    record_id: 'abc-125',
    name: 'api.textinsightpro.netlify.app',
    type: 'A',
    routingPolicy: 'Simple',
    setIdentifier: '-',
    alias: 'Yes',
    value: 'd2q2e128u923.cloudfront.net.',
    ttl: '-',
    healthCheckId: '-',
    evaluateTargetHealth: 'No'
  },
  {
    id: 'rec-4',
    record_id: 'abc-126',
    name: 'mail.textinsightpro.netlify.app',
    type: 'MX',
    routingPolicy: 'Simple',
    setIdentifier: '-',
    alias: 'No',
    value: '10 inbound-smtp.us-east-1.amazonaws.com',
    ttl: '300',
    healthCheckId: '-',
    evaluateTargetHealth: 'No'
  },
  {
    id: 'rec-5',
    record_id: 'abc-127',
    name: 'textinsightpro.netlify.app',
    type: 'TXT',
    routingPolicy: 'Simple',
    setIdentifier: '-',
    alias: 'No',
    value: '"v=spf1 include:amazonses.com ~all"',
    ttl: '300',
    healthCheckId: '-',
    evaluateTargetHealth: 'No'
  },
  {
    id: 'rec-6',
    record_id: 'abc-128',
    name: 'www.textinsightpro.netlify.app',
    type: 'CNAME',
    routingPolicy: 'Simple',
    setIdentifier: '-',
    alias: 'No',
    value: 'textinsightpro.netlify.app',
    ttl: '300',
    healthCheckId: '-',
    evaluateTargetHealth: 'No'
  },
];
