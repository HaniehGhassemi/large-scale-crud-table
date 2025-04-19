import { fetchGetAllCategories } from '@/api/categories/categories';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import Input from '@/components/Fields/Input/Input';
import Select from '@/components/Fields/Select/Select';
import Textarea from '@/components/Fields/Textarea/Textarea';
import { SelectOption } from '@/shared/types/types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './UpdateProduct.module.scss';
import { Product } from '@/api/products/products.types';
import { updateProductById } from '@/db/ProductsDB';
import { productValidationSchema } from '@/shared/validations/ProductValidations';

interface UpdateProductProps {
  product: Product;
  submit: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ submit, product }) => {
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

  const updateProductDetailsRequest = useFormik({
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

      const dbResult = await updateProductById(product.id, {
        ...values,
      });

      if (!dbResult) {
        setIsBtnLoading(false);
        return;
      }

      toast.success(`${values.title} updated successfully`);
      setIsBtnLoading(false);
      submit();
    },
  });

  useEffect(() => {
    updateProductDetailsRequest.setValues({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
    });
  }, [product]);

  return (
    <form
      className={styles.form}
      onSubmit={updateProductDetailsRequest.handleSubmit}
    >
      <Input
        type={'text'}
        label={'title'}
        value={updateProductDetailsRequest.values.title}
        onChange={updateProductDetailsRequest.handleChange('title')}
        error={updateProductDetailsRequest.errors.title}
        className={styles.fullWidthItem}
      />

      <Select
        label={'category'}
        options={categories}
        value={updateProductDetailsRequest.values.category}
        handleChange={(value) => {
          updateProductDetailsRequest.setFieldValue('category', value);
        }}
        error={updateProductDetailsRequest.errors.category}
      />

      <Input
        type={'text'}
        label={'price'}
        value={updateProductDetailsRequest.values.price}
        onChange={updateProductDetailsRequest.handleChange('price')}
        error={updateProductDetailsRequest.errors.price}
      />
      <Input
        type={'text'}
        label={'stock'}
        value={updateProductDetailsRequest.values.stock}
        onChange={updateProductDetailsRequest.handleChange('stock')}
        error={updateProductDetailsRequest.errors.stock}
      />
      <Input
        type={'text'}
        label={'rating'}
        value={updateProductDetailsRequest.values.rating}
        onChange={updateProductDetailsRequest.handleChange('rating')}
        error={updateProductDetailsRequest.errors.rating}
      />

      <Textarea
        label={'description'}
        value={updateProductDetailsRequest.values.description}
        onChange={updateProductDetailsRequest.handleChange('description')}
        error={updateProductDetailsRequest.errors.description}
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

export default UpdateProduct;
