import React, { useState } from 'react';
import { Modal, Box, SpaceBetween, Button, FormField, Input, Alert } from '@cloudscape-design/components';
import { HostedZone } from '@/contexts/HostedZonesContext';
import { useRouter } from 'next/navigation';

interface DeleteHostedZoneModalProps {
  visible: boolean;
  onDismiss: () => void;
  onDelete: () => void;
  zone: HostedZone | null;
}

export function DeleteHostedZoneModal({ visible, onDismiss, onDelete, zone }: DeleteHostedZoneModalProps) {
  const [confirmationText, setConfirmationText] = useState('');
  const router = useRouter();

  if (!zone) return null;

  const isConfirmed = confirmationText === 'delete';

  const handleGoToDetails = () => {
    onDismiss();
    router.push(`/hosted-zones/${zone.id}`);
  };

  return (
    <Modal
      onDismiss={onDismiss}
      visible={visible}
      closeAriaLabel="Close modal"
      header={`Delete hosted zone ${zone.name}?`}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>Cancel</Button>
            <Button variant="primary" disabled={!isConfirmed} onClick={onDelete}>Delete</Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="l">
        <Box variant="p">
          Delete the hosted zone permanently? This action cannot be undone. Your domain might become unavailable on the internet.
        </Box>
        
        <Alert
          type="warning"
          header={`Take these actions to delete hosted zone ${zone.name}`}
        >
          <SpaceBetween size="m">
            <Box variant="p">
              Complete the following steps to successfully delete this hosted zone. If you don't complete the steps, the deletion might be blocked by Route 53 service validation.
            </Box>
            <ul>
              <li>Delete all records in this hosted zone, except the default NS and SOA records.</li>
            </ul>
            <Button onClick={handleGoToDetails}>
              Go to hosted zone details
            </Button>
          </SpaceBetween>
        </Alert>

        <FormField
          label={
            <span>
              To confirm that you want to delete the hosted zone, enter <i>delete</i> in the field.
            </span>
          }
        >
          <Input
            value={confirmationText}
            onChange={({ detail }) => setConfirmationText(detail.value)}
            placeholder="delete"
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
}
