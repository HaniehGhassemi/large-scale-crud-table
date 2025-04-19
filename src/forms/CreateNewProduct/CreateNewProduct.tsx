import Input from '@/components/Fields/Input/Input';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Textarea from '@/components/Fields/Textarea/Textarea';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { useEffect, useState } from 'react';
import styles from './CreateNewProduct.module.scss';
import { SelectOption } from '@/shared/types/types';
import { fetchGetAllCategories } from '@/api/categories/categories';
import Select from '@/components/Fields/Select/Select';
import { createProduct } from '@/db/ProductsDB';
import { productValidationSchema } from '@/shared/validations/ProductValidations';

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
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      setIsBtnLoading(true);

      const dbResult = await createProduct({
        ...values,
      });

      if (!dbResult) {
        setIsBtnLoading(false);
        toast.success('Error creating product');
        return;
      }

      setIsBtnLoading(false);
      toast.success(`${values.title} created successfully`);
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
