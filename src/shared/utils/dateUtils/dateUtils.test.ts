import { describe, it, expect } from 'vitest';
import { convertDate } from './dateUtils';

describe('convertDate', () => {
  it('should convert ISO date string to "MMM DD, YYYY" format', () => {
    const input = '2025-04-19T00:00:00Z';
    const result = convertDate(input);

    expect(result).toBe('Apr 19, 2025');
  });

  it('should return "Invalid Date" for invalid input', () => {
    const input = 'not-a-date';
    const result = convertDate(input);

    expect(result).toBe('Invalid Date');
  });

  it('should handle empty string', () => {
    const result = convertDate('');
    expect(result).toBe('Invalid Date');
  });
});
