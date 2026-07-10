export interface DnsRecord {
  id: string;
  name: string;
  type: string;
  routingPolicy: string;
  difference: string;
  alias: string;
  value: string;
  ttl: string;
  comment?: string;
}

export const MOCK_RECORDS: DnsRecord[] = [
  {
    id: 'rec-1',
    name: 'textinsightpro.netlify.app',
    type: 'NS',
    routingPolicy: 'Simple',
    difference: '-',
    alias: 'No',
    value: 'ns-733.awsdns-27.net.\\nns-126.awsdns-15.com.\\nns-1314.awsdns-36.org.\\nns-1618.awsdns-10.co.uk.',
    ttl: '172,800',
  },
  {
    id: 'rec-2',
    name: 'textinsightpro.netlify.app',
    type: 'SOA',
    routingPolicy: 'Simple',
    difference: '-',
    alias: 'No',
    value: 'ns-733.awsdns-27.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400',
    ttl: '900',
  },
  {
    id: 'rec-3',
    name: 'api.textinsightpro.netlify.app',
    type: 'A',
    routingPolicy: 'Simple',
    difference: '-',
    alias: 'Yes',
    value: 'd2q2e128u923.cloudfront.net.',
    ttl: '-',
  },
  {
    id: 'rec-4',
    name: 'mail.textinsightpro.netlify.app',
    type: 'MX',
    routingPolicy: 'Simple',
    difference: '-',
    alias: 'No',
    value: '10 inbound-smtp.us-east-1.amazonaws.com',
    ttl: '300',
  },
  {
    id: 'rec-5',
    name: 'textinsightpro.netlify.app',
    type: 'TXT',
    routingPolicy: 'Simple',
    difference: '-',
    alias: 'No',
    value: '"v=spf1 include:amazonses.com ~all"',
    ttl: '300',
  },
  {
    id: 'rec-6',
    name: 'www.textinsightpro.netlify.app',
    type: 'CNAME',
    routingPolicy: 'Simple',
    difference: '-',
    alias: 'No',
    value: 'textinsightpro.netlify.app',
    ttl: '300',
  },
];
