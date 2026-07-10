export const validateIpv4 = (value: string): boolean => {
  if (!value) return false;
  const blocks = value.split('.');
  if (blocks.length !== 4) return false;
  return blocks.every(block => {
    const num = parseInt(block, 10);
    return num >= 0 && num <= 255 && String(num) === block;
  });
};

export const validateIpv6 = (value: string): boolean => {
  if (!value) return false;
  const blocks = value.split(':');
  if (blocks.length < 3 || blocks.length > 8) return false;
  const regex = /^[0-9a-fA-F]{1,4}$/;
  let emptyCount = 0;
  for (const block of blocks) {
    if (block === '') {
      emptyCount++;
      if (emptyCount > 1) return false; // Only one :: allowed (simplified validation)
    } else if (!regex.test(block)) {
      return false;
    }
  }
  return true;
};

export const validatePositiveInteger = (value: string): boolean => {
  const num = parseInt(value, 10);
  return !isNaN(num) && num > 0 && String(num) === value;
};

export const validateDomain = (value: string): boolean => {
  if (!value) return false;
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

export const validateRecordValue = (type: string, value: string): string | null => {
  if (!value || value.trim() === '') {
    return 'Value is required.';
  }

  const lines = value.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  for (const line of lines) {
    switch (type) {
      case 'A':
        if (!validateIpv4(line)) return `Invalid IPv4 address: ${line}`;
        break;
      case 'AAAA':
        if (!validateIpv6(line)) return `Invalid IPv6 address: ${line}`;
        break;
      case 'CNAME':
        if (!validateDomain(line)) return `Invalid domain name: ${line}`;
        break;
      default:
        break;
    }
  }

  return null;
};
