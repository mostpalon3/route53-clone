export interface HostedZone {
  id: string;
  name: string;
  type: 'Public' | 'Private';
  createdBy: string;
  recordCount: number;
  description: string;
  tags?: { key: string; value: string }[];
}

export const MOCK_HOSTED_ZONES: HostedZone[] = [
  {
    id: 'Z04D3Q382T08ABCDEFGH1',
    name: 'example.com',
    type: 'Public',
    createdBy: 'arn:aws:iam::926028309602:user/mostpalon3',
    recordCount: 4,
    description: 'Main production domain',
  },
  {
    id: 'Z01893922I9F1ABCDEFGH2',
    name: 'demo.net',
    type: 'Public',
    createdBy: 'arn:aws:iam::926028309602:user/mostpalon3',
    recordCount: 2,
    description: 'Demo environments',
  },
  {
    id: 'Z10933923J8G1ABCDEFGH3',
    name: 'company.org',
    type: 'Private',
    createdBy: 'arn:aws:iam::926028309602:user/mostpalon3',
    recordCount: 15,
    description: 'Internal corporate network',
  },
  {
    id: 'Z04938222K7H1ABCDEFGH4',
    name: 'test.dev',
    type: 'Public',
    createdBy: 'arn:aws:iam::926028309602:user/mostpalon3',
    recordCount: 8,
    description: 'Testing and staging domain',
  },
];

// Set to true to test the empty state
export const USE_EMPTY_STATE = false;
