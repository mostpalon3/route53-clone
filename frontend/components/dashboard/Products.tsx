import React from 'react';
import { Cards, Header, Link } from '@cloudscape-design/components';

export function Products() {
  const products = [
    {
      name: 'Amazon VPC',
      description: 'Logically isolated section of the AWS Cloud where you can launch AWS resources.',
    },
    {
      name: 'AWS Transit Gateway',
      description: 'Easily scale connectivity across thousands of Amazon VPCs, AWS accounts, and on-premises networks.',
    },
    {
      name: 'AWS Direct Connect',
      description: 'Establish a dedicated network connection from your premises to AWS.',
    },
    {
      name: 'Elastic Load Balancing',
      description: 'Automatically distribute incoming application traffic across multiple targets.',
    }
  ];

  return (
    <Cards
      header={<Header variant="h2">Related Networking Products</Header>}
      items={products}
      cardDefinition={{
        header: item => <Link href="#" fontSize="heading-m">{item.name}</Link>,
        sections: [
          {
            id: 'description',
            content: item => item.description
          }
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
    />
  );
}
