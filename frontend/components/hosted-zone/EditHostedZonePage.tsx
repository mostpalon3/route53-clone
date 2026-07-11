"use client";

import React, { useState } from 'react';
import { Form, SpaceBetween, Container, Header, FormField, Textarea, Button, Box } from '@cloudscape-design/components';
import { HostedZone } from '@/mock/hostedZones';
import { HostedZoneTagEditor, Tag } from './HostedZoneTagEditor';
import { useRouter } from 'next/navigation';
import { useHostedZones } from '@/contexts/HostedZonesContext';

export function EditHostedZonePage({ zoneId }: { zoneId: string }) {
  const router = useRouter();
  const { hostedZones, updateHostedZone } = useHostedZones();
  
  const zone = hostedZones.find(z => z.id === zoneId);
  
  const [description, setDescription] = useState(zone?.description || '');
  const [tags, setTags] = useState<Tag[]>(zone?.tags ? [...zone.tags] : []);

  if (!zone) {
    return <Box margin="xxl" textAlign="center">Zone not found</Box>;
  }

  const handleSave = () => {
    updateHostedZone(zoneId, {
      ...zone,
      description,
      tags
    });
    router.push(`/hosted-zones/${zoneId}?updated=true`);
  };

  const handleCancel = () => {
    router.push('/hosted-zones');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save changes</Button>
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Hosted zone configuration</Header>}>
            <SpaceBetween size="l">
              <div>
                <Box variant="awsui-key-label">Domain name</Box>
                <div>{zone.name}</div>
              </div>

              <div>
                <Box variant="awsui-key-label">Hosted zone ID</Box>
                <div>{zone.id}</div>
              </div>

              <div>
                <Box variant="awsui-key-label">Record count</Box>
                <div>{zone.recordCount}</div>
              </div>

              <div>
                <Box variant="awsui-key-label">Type</Box>
                <div>{zone.type}</div>
              </div>

              <FormField
                label="Description - optional"
                description="A maximum of 256 characters."
                constraintText={description.length > 256 ? "Maximum 256 characters exceeded." : undefined}
                errorText={description.length > 256 ? "Maximum 256 characters exceeded." : undefined}
              >
                <Textarea
                  value={description}
                  onChange={({ detail }) => setDescription(detail.value)}
                />
              </FormField>
            </SpaceBetween>
          </Container>

          <HostedZoneTagEditor tags={tags} onChange={setTags} />
        </SpaceBetween>
      </Form>
    </form>
  );
}
