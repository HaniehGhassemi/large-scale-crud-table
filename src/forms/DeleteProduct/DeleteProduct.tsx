import Typography from '@/components/Typography/Typography';
import { AccentColors, FontSize, Variant } from '@/shared/types/enums';
import { toast } from 'react-toastify';
import styles from './DeleteProduct.module.scss';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { TrashIcon } from '@/assets/icons';
import { deleteProductById } from '@/db/ProductsDB';

interface DeleteProductProps {
  id: number;
  title: string;
  submit: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ id, title, submit }) => {
  const deleteProductRequest = async () => {
    const dbResult = await deleteProductById(id);

    if (!dbResult) return;

    toast.success(`${title} deleted successfully`);
    submit();
  };

  return (
    <div className={styles.section}>
      <Typography
        variant={Variant.H2}
        text={'Are you sure you want to delete this product?'}
        fontSize={FontSize.LG}
      />
      <Typography
        variant={Variant.P}
        color={AccentColors.Disabled}
        text={
          "This action is irreversible, and once deleted, you won't be able to recover it."
        }
      />
      <div className={styles.action}>
        <BaseButton text={'cancel'} onClick={submit} />
        <BaseButton
          text={'delete'}
          color={AccentColors.Tertiary}
          icon={<TrashIcon />}
          onClick={deleteProductRequest}
        />
      </div>
    </div>
  );
};

export default DeleteProduct;
