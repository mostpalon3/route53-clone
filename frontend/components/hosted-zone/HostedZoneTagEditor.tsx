import React from 'react';
import { SpaceBetween, Box, Button, FormField, Input, Grid, Header, Container } from '@cloudscape-design/components';

export interface Tag {
  key: string;
  value: string;
}

interface HostedZoneTagEditorProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
}

export function HostedZoneTagEditor({ tags, onChange }: HostedZoneTagEditorProps) {
  const handleAddTag = () => {
    if (tags.length < 50) {
      onChange([...tags, { key: '', value: '' }]);
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleTagChange = (index: number, field: keyof Tag, value: string) => {
    const newTags = [...tags];
    newTags[index][field] = value;
    onChange(newTags);
  };

  return (
    <Container
      header={
        <Header variant="h2" info={<Link variant="info">Info</Link>}>
          Tags
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Box variant="p">
          Apply tags to hosted zones to help organize and identify them.
        </Box>

        {tags.map((tag, index) => (
          <Grid
            key={index}
            gridDefinition={[{ colspan: 4 }, { colspan: 6 }, { colspan: 2 }]}
          >
            <FormField label={index === 0 ? "Key" : undefined}>
              <Input
                value={tag.key}
                onChange={({ detail }) => handleTagChange(index, 'key', detail.value)}
                placeholder="Key"
              />
            </FormField>
            
            <FormField label={index === 0 ? "Value - optional" : undefined}>
              <Input
                value={tag.value}
                onChange={({ detail }) => handleTagChange(index, 'value', detail.value)}
                placeholder="Value"
                clearAriaLabel="Clear"
              />
            </FormField>

            <div style={{ marginTop: index === 0 ? '24px' : '0' }}>
              <Button formAction="none" onClick={() => handleRemoveTag(index)}>
                Remove tag
              </Button>
            </div>
          </Grid>
        ))}

        <div>
          <Button formAction="none" onClick={handleAddTag} disabled={tags.length >= 50}>
            Add tag
          </Button>
          <Box variant="small" color="text-body-secondary" margin={{ top: 'xs' }}>
            You can add up to {50 - tags.length} more tags.
          </Box>
        </div>
      </SpaceBetween>
    </Container>
  );
}

// Needed for Info Link inside header
import { Link } from '@cloudscape-design/components';
