import { useEffect, useState, useCallback } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { fetchGetAllCategories } from '@/api/categories/categories';
import CustomDatePicker from '@/components/Fields/CustomDatePicker/CustomDatePicker';
import Input from '@/components/Fields/Input/Input';
import Select from '@/components/Fields/Select/Select';
import Typography from '@/components/Typography/Typography';
import BaseButton from '@/components/BaseButton/BaseButton';
import { ProductsFiltersProps } from './ProductsFilters.types';
import { SelectOption } from '@/shared/types/types';
import { AccentColors, Variant } from '@/shared/types/enums';
import styles from './ProductsFilters.module.scss';

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  onAppliedFilters,
  appliedFilters,
  submit,
}) => {
  const [categories, setCategories] = useState<SelectOption[]>([]);

  const [filters, setFilters] = useState({
    minPrice: appliedFilters?.minPrice || '',
    maxPrice: appliedFilters?.maxPrice || '',
    category: appliedFilters?.category || '',
    startDate: appliedFilters?.startDate
      ? new DateObject(appliedFilters.startDate)
      : undefined,
    endDate: appliedFilters?.endDate
      ? new DateObject(appliedFilters.endDate)
      : undefined,
  });

  useEffect(() => {
    const getAllCategories = async () => {
      const { data, error } = await fetchGetAllCategories();

      if (!data || error) return;

      const options = data.data.map((category) => ({
        title: category.title,
        value: category.title,
      }));

      setCategories(options);
    };

    getAllCategories();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    date: DateObject | undefined,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: date }));
  };

  const handleApply = useCallback(() => {
    const cleanedFilters = {
      minPrice: filters.minPrice?.trim() || undefined,
      maxPrice: filters.maxPrice?.trim() || undefined,
      category: filters.category?.trim() || undefined,
      startDate: filters.startDate
        ? new Date(filters.startDate.toDate()).toISOString()
        : undefined,
      endDate: filters.endDate
        ? new Date(filters.endDate.toDate()).toISOString()
        : undefined,
    };

    onAppliedFilters(cleanedFilters);
    submit();
  }, [filters, onAppliedFilters]);

  const handleClear = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      category: '',
      startDate: undefined,
      endDate: undefined,
    };

    setFilters(clearedFilters);
  };

  return (
    <div className={styles.section}>
      <div className={styles.filterSection}>
        <Typography variant={Variant.P} text="Price:" />
        <div className={styles.forms}>
          <Input
            type="text"
            label="min"
            value={filters.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
          />
          -
          <Input
            type="text"
            label="max"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <Typography variant={Variant.P} text="Date:" />
        <div className={styles.forms}>
          <CustomDatePicker
            label="start date"
            value={filters.startDate}
            onChange={(date) =>
              handleDateChange('startDate', date as DateObject)
            }
          />
          -
          <CustomDatePicker
            label="end date"
            value={filters.endDate}
            onChange={(date) => handleDateChange('endDate', date as DateObject)}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <Typography variant={Variant.P} text="Category:" />
        <Select
          value={filters.category}
          handleChange={(value) =>
            handleInputChange('category', value as string)
          }
          options={categories}
        />
      </div>

      <div className={styles.footer}>
        <BaseButton
          text="Clear all filters"
          color={AccentColors.Secondary}
          onClick={handleClear}
        />
        <BaseButton text="Apply" onClick={handleApply} />
      </div>
    </div>
  );
};

export default ProductsFilters;
