import React, { ChangeEvent } from 'react';
import styles from './Textarea.module.scss';
import Label from '../Label/Label';
import { Variant, AccentColors, FontSize } from '@/shared/types/enums';
import Typography from '@/components/Typography/Typography';

interface TextareaProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  rows?: number;
  cols?: number;
  require?: boolean;
  error?: string | string[];
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  value = '',
  placeholder = '',
  onChange,
  rows = 4,
  cols = 50,
  label,
  error,
  className,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${styles.fields} ${className}`}>
      {label && <Label label={label} />}
      <textarea
        id="textarea"
        value={value}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        className={`${styles.textarea} 
        ${error && styles.textareaError}`}
      />

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

export default Textarea;
