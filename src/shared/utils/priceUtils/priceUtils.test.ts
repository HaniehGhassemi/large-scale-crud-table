import { describe, it, expect } from 'vitest';
import priceSeparator from './priceUtils';

describe('priceSeparator', () => {
  it('should format number with comma separator for thousands', () => {
    const input = 1000000;
    const result = priceSeparator(input);
    expect(result).toBe('1,000,000');
  });

  it('should handle decimal numbers correctly', () => {
    const input = 1234567.89;
    const result = priceSeparator(input);
    expect(result).toBe('1,234,567.89');
  });

  it('should handle numbers without decimals', () => {
    const input = 1234567;
    const result = priceSeparator(input);
    expect(result).toBe('1,234,567');
  });

  it('should handle small numbers correctly', () => {
    const input = 100;
    const result = priceSeparator(input);
    expect(result).toBe('100');
  });

  it('should handle zero correctly', () => {
    const input = 0;
    const result = priceSeparator(input);
    expect(result).toBe('0');
  });

  it('should handle negative numbers correctly', () => {
    const input = -1234567;
    const result = priceSeparator(input);
    expect(result).toBe('-1,234,567');
  });

  it('should handle very large numbers correctly', () => {
    const input = 1234567890123456;
    const result = priceSeparator(input);
    expect(result).toBe('1,234,567,890,123,456');
  });

  it('should not alter numbers that are already formatted', () => {
    const input = 1000.45;
    const result = priceSeparator(input);
    expect(result).toBe('1,000.45');
  });
});
