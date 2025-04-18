import React, { ReactNode } from 'react';
import styles from './Input.module.scss';
import { AccentColors, FontSize, Variant } from '@/shared/types/enums';
import Label from '../Label/Label';
import Typography from '@/components/Typography/Typography';

interface InputProps {
  type: string;
  placeHolder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string | string[];
  icon?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  type,
  placeHolder,
  value,
  onChange,
  label,
  error,
  icon,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <Label label={label} />}
      <div className={`${styles.field} ${error && styles.error}`}>
        <input
          id={label}
          className={styles.input}
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
        />
        {icon && icon}
      </div>

      {error && (
        <Typography
          variant={Variant.P}
          color={AccentColors.Error}
          fontSize={FontSize.Mini}
          fontWeight={500}
          text={error}
        />
      )}
    </div>
  );
};

export default Input;
