"use client";

import React from 'react';
import { SpaceBetween, TextFilter, Select } from '@cloudscape-design/components';

interface RecordFiltersProps {
  filteringText: string;
  onChange: (text: string) => void;
}

export function RecordFilters({ filteringText, onChange }: RecordFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ flexGrow: 1 }}>
        <TextFilter
          filteringText={filteringText}
          filteringPlaceholder="Filter records by property or value"
          onChange={({ detail }) => onChange(detail.filteringText)}
        />
      </div>
      <Select
        selectedOption={null}
        options={[
          { label: 'A', value: 'A' },
          { label: 'CNAME', value: 'CNAME' },
          { label: 'MX', value: 'MX' },
        ]}
        placeholder="Type"
      />
      <Select
        selectedOption={null}
        options={[
          { label: 'Simple', value: 'Simple' },
          { label: 'Weighted', value: 'Weighted' },
        ]}
        placeholder="Routing policy"
      />
      <Select
        selectedOption={null}
        options={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ]}
        placeholder="Alias"
      />
    </div>
  );
}
