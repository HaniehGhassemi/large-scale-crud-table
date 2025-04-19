import { productValidationSchema } from '@/shared/validations/ProductValidations';
import { describe, it, expect } from 'vitest';

describe('Product Validation Schema', () => {
  it('should validate valid data', async () => {
    const validData = {
      title: 'Valid Title',
      description: 'This is a valid description with more than 10 characters.',
      category: 'Category1',
      price: 10,
      stock: 20,
      rating: 4,
    };

    await expect(
      productValidationSchema.validate(validData),
    ).resolves.not.toThrow();
  });

  it('should return error for invalid title', async () => {
    const invalidData = {
      title: 'ab',
      description: 'Valid description with more than 10 characters.',
      category: 'Category1',
      price: 10,
      stock: 20,
      rating: 4,
    };

    await expect(
      productValidationSchema.validate(invalidData),
    ).rejects.toThrowError('Title must be at least 3 characters long');
  });

  it('should return error for missing description', async () => {
    const invalidData = {
      title: 'Valid Title',
      description: '',
      category: 'Category1',
      price: 10,
      stock: 20,
      rating: 4,
    };

    await expect(
      productValidationSchema.validate(invalidData),
    ).rejects.toThrowError('Description is required');
  });

  it('should return error for invalid price', async () => {
    const invalidData = {
      title: 'Valid Title',
      description: 'Valid description with more than 10 characters.',
      category: 'Category1',
      price: -1,
      stock: 20,
      rating: 4,
    };

    await expect(
      productValidationSchema.validate(invalidData),
    ).rejects.toThrowError('Price cannot be less than 0');
  });

  it('should return error for rating greater than 5', async () => {
    const invalidData = {
      title: 'Valid Title',
      description: 'Valid description with more than 10 characters.',
      category: 'Category1',
      price: 10,
      stock: 20,
      rating: 6,
    };

    await expect(
      productValidationSchema.validate(invalidData),
    ).rejects.toThrowError('Rating cannot be more than 5');
  });

  it('should return error for invalid category', async () => {
    const invalidData = {
      title: 'Valid Title',
      description: 'Valid description with more than 10 characters.',
      category: '',
      price: 10,
      stock: 20,
      rating: 4,
    };

    await expect(
      productValidationSchema.validate(invalidData),
    ).rejects.toThrowError('Category is required');
  });
});
