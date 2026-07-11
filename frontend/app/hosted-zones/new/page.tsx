"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Form, 
  SpaceBetween, 
  Button, 
  Container, 
  Header, 
  FormField, 
  Input, 
  RadioGroup, 
  Textarea,
  BreadcrumbGroup,
  Alert
} from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';
import { useHostedZones } from '@/contexts/HostedZonesContext';

export default function CreateHostedZonePage() {
  const router = useRouter();
  const { addHostedZone } = useHostedZones();

  const [domainName, setDomainName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      await addHostedZone({
        domain_name: domainName,
        description: description,
        zone_type: type.toUpperCase()
      });
      router.push('/hosted-zones');
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.detail) {
        setErrorMsg(err.response.data.detail);
      } else {
        setErrorMsg('Failed to create hosted zone. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Route 53', href: '/' },
            { text: 'Hosted zones', href: '/hosted-zones' },
            { text: 'Create hosted zone', href: '/hosted-zones/new' },
          ]}
          onFollow={e => {
            e.preventDefault();
            router.push(e.detail.href);
          }}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <Form
          errorText={errorMsg}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" variant="link" onClick={() => router.push('/hosted-zones')}>
                Cancel
              </Button>
              <Button variant="primary" loading={isSubmitting}>
                Create hosted zone
              </Button>
            </SpaceBetween>
          }
        >
          <Container header={<Header variant="h2">Hosted zone configuration</Header>}>
            <SpaceBetween direction="vertical" size="l">
              <FormField 
                label="Domain name" 
                description="Enter the name of the domain. For example, example.com."
              >
                <Input
                  value={domainName}
                  onChange={({ detail }) => setDomainName(detail.value)}
                  placeholder="example.com"
                />
              </FormField>
              
              <FormField label="Description" description="Optional comment about the hosted zone.">
                <Textarea
                  value={description}
                  onChange={({ detail }) => setDescription(detail.value)}
                  placeholder="Enter a description"
                />
              </FormField>
              
              <FormField label="Type" description="Public hosted zones are visible to the internet. Private hosted zones are visible only to the VPCs that you specify.">
                <RadioGroup
                  value={type}
                  onChange={({ detail }) => setType(detail.value)}
                  items={[
                    { value: 'Public', label: 'Public hosted zone' },
                    { value: 'Private', label: 'Private hosted zone' }
                  ]}
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </Form>
      </form>
    </AppShell>
  );
}
