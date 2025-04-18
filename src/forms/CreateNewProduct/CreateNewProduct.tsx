import { fetchCreateNewProducts } from '@/api/products/products';
import Input from '@/components/Fields/Input/Input';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as y from 'yup';
import CONSTANTS from '@/shared/types/constants';
import Textarea from '@/components/Fields/Textarea/Textarea';
import BaseButton from '@/components/BaseButton/BaseButton';
import { useEffect, useState } from 'react';
import styles from './CreateNewProduct.module.scss';
import { SelectOption } from '@/shared/types/types';
import { fetchGetAllCategories } from '@/api/categories/categories';
import Select from '@/components/Fields/Select/Select';

interface CreateNewProductProps {
  submit: () => void;
}

const CreateNewProduct: React.FC<CreateNewProductProps> = ({ submit }) => {
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<SelectOption[]>([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const { data, error } = await fetchGetAllCategories();

      if (!data || error) return;

      const options: SelectOption[] = data.data.map((category) => ({
        title: category.title,
        value: category.title,
      }));

      setCategories(options);
    };

    getAllCategories();
  }, []);

  const createNewProductRequest = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      rating: 0,
    },
    validationSchema: y.object({
      title: y
        .string()
        .required('Title is required')
        .matches(
          CONSTANTS.REGEX.TITLE,
          'Title must only contain letters and spaces',
        )
        .min(3, 'Title must be at least 3 characters long'),
      description: y
        .string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
      category: y.string().required('Category is required'),
      price: y
        .number()
        .typeError('Price must be a number')
        .required('Price is required')
        .min(1, 'Price cannot be less than 0'),
      stock: y
        .number()
        .typeError('Stock must be a number')
        .required('Stock is required')
        .min(1, 'Stock cannot be less than 0'),
      rating: y
        .number()
        .typeError('Rating must be a number')
        .required('Rating is required')
        .min(1, 'Rating cannot be less than 0')
        .max(5, 'Rating cannot be more than 5'),
    }),
    onSubmit: async (values) => {
      setIsBtnLoading(true);

      const { data, error } = await fetchCreateNewProducts({
        ...values,
      });

      if (!data || error) {
        setIsBtnLoading(false);
        return;
      }

      toast.success(`${values.title} created successfully`);
      setIsBtnLoading(false);
      submit();
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={createNewProductRequest.handleSubmit}
    >
      <Input
        type={'text'}
        label={'title'}
        value={createNewProductRequest.values.title}
        onChange={createNewProductRequest.handleChange('title')}
        error={createNewProductRequest.errors.title}
        className={styles.fullWidthItem}
      />

      <Select
        label={'category'}
        options={categories}
        value={createNewProductRequest.values.category}
        handleChange={(value) => {
          createNewProductRequest.setFieldValue('category', value);
        }}
        error={createNewProductRequest.errors.category}
      />

      <Input
        type={'text'}
        label={'price'}
        value={createNewProductRequest.values.price}
        onChange={createNewProductRequest.handleChange('price')}
        error={createNewProductRequest.errors.price}
      />
      <Input
        type={'text'}
        label={'stock'}
        value={createNewProductRequest.values.stock}
        onChange={createNewProductRequest.handleChange('stock')}
        error={createNewProductRequest.errors.stock}
      />
      <Input
        type={'text'}
        label={'rating'}
        value={createNewProductRequest.values.rating}
        onChange={createNewProductRequest.handleChange('rating')}
        error={createNewProductRequest.errors.rating}
      />

      <Textarea
        label={'description'}
        value={createNewProductRequest.values.description}
        onChange={createNewProductRequest.handleChange('description')}
        error={createNewProductRequest.errors.description}
        rows={5}
        className={styles.fullWidthItem}
      />

      <BaseButton
        text="submit"
        type="submit"
        isLoading={isBtnLoading}
        className={`${styles.fullWidthItem} ${styles.submitBtn}`}
      />
    </form>
  );
};

export default CreateNewProduct;
