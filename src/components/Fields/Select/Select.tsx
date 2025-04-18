import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Select.module.scss';
import { AccentColors, FontSize, Variant } from '@/shared/types/enums';
import Label from '../Label/Label';
import TypoGraphy from '@/components/Typography/Typography';
import { SelectOption } from '@/shared/types/types';
import Typography from '@/components/Typography/Typography';
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons';

interface SelectProps {
  label?: string;
  value?: number | string;
  handleChange: (value: string | number) => void;
  error?: string;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  handleChange,
  error,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const calculatePosition = () => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen]);

  return (
    <div className={styles.wrapper}>
      {label && <Label label={label} />}
      <div className={styles.field}>
        <div
          className={`${styles.select}  ${error && styles.selectError}`}
          ref={selectRef}
          onClick={() => {
            setIsOpen((prev) => !prev);
            calculatePosition();
          }}
        >
          <TypoGraphy
            color={AccentColors.Primary}
            variant={Variant.P}
            text={
              options.find((option) => option.value === value)?.title ||
              'please choose'
            }
          />
          {isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
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

      {isOpen &&
        createPortal(
          <div
            ref={optionsRef}
            className={styles['options-list']}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              position: 'absolute',
              zIndex: 1000,
              width: `${selectRef.current?.offsetWidth}px`,
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={styles.option}
                onClick={() => {
                  handleChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.title}
              </div>
            ))}
            {options.length === 0 && (
              <Typography variant={Variant.P} text={'Not Found'} />
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Select;
