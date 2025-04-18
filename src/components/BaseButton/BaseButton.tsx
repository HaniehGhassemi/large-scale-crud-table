import Loader from '@/components/Loader/Loader';
import styles from './BaseButton.module.scss';
import { AccentColors } from '@/shared/types/enums';
import React from 'react';
import { LoaderSizes } from '@/components/Loader/Loader.types';

interface BaseButtonProps {
  type?: 'submit' | 'button';
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: AccentColors;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  type,
  text,
  color,
  onClick,
  icon,
  disabled,
  isLoading,
  className,
}) => {
  return (
    <button
      className={`${styles.btn} ${
        color
          ? styles[`${color.toLowerCase()}`]
          : styles[`${AccentColors.Primary.toLocaleLowerCase()}`]
      } ${className}   
      ${disabled && styles.disabled}`}
      onClick={onClick}
      type={type || 'button'}
      title={text}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader size={LoaderSizes.SMALL} />
      ) : (
        <>
          {text && text}
          {icon && icon}
        </>
      )}
    </button>
  );
};

export default BaseButton;
