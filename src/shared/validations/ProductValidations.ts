import * as yup from 'yup';
import CONSTANTS from '@/shared/types/constants';

// use for create and update products
export const productValidationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .matches(
      CONSTANTS.REGEX.TITLE,
      'Title must only contain letters and spaces',
    )
    .min(3, 'Title must be at least 3 characters long'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  category: yup.string().required('Category is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(1, 'Price cannot be less than 0'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .required('Stock is required')
    .min(1, 'Stock cannot be less than 0'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(1, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot be more than 5'),
});
