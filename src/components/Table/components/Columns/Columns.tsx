import { useState } from 'react';
import IconButton from '@/components/IconButton/IconButton';
import { Column } from '../../Table.types';
import styles from './Columns.module.scss';
import { SortIcon, ArrowTopIcon, ArrowDownIcon } from '@/assets/icons';
import { AccentColors } from '@/shared/types/enums';
import { SortOrder } from '@/shared/types/enums';
import { Sort } from '@/shared/types/types';

interface ColumnsProps {
  columns: Column[];
  onSortChange?: (sort?: Sort) => void;
}

const Columns: React.FC<ColumnsProps> = ({ columns, onSortChange }) => {
  const [sortBy, setSortBy] = useState<string>();
  const [sortOrder, setSortOrder] = useState<SortOrder>();

  const handleSortClick = (label: string) => {
    if (sortBy === label) {
      const nextOrder =
        sortOrder === SortOrder.Desc
          ? SortOrder.Asc
          : sortOrder === SortOrder.Asc
            ? undefined
            : SortOrder.Desc;

      const nextSort = nextOrder
        ? { sortBy: label, sortOrder: nextOrder }
        : undefined;

      setSortOrder(nextOrder);
      setSortBy(nextOrder ? label : undefined);
      onSortChange?.(nextSort);
    } else {
      const sort: Sort = { sortBy: label, sortOrder: SortOrder.Desc };
      setSortBy(label);
      setSortOrder(SortOrder.Desc);
      onSortChange?.(sort);
    }
  };

  const getSortIcon = (label: string) => {
    if (sortBy !== label) return <SortIcon />;
    if (sortOrder === SortOrder.Asc) return <ArrowTopIcon />;
    if (sortOrder === SortOrder.Desc) return <ArrowDownIcon />;
    return <SortIcon />;
  };

  const getSortTitle = (label: string) => {
    if (sortBy !== label) return 'Sort';
    if (sortOrder === SortOrder.Asc) return 'Sorted ascending';
    if (sortOrder === SortOrder.Desc) return 'Sorted descending';
    return 'Sort';
  };

  return (
    <div className={styles.columns}>
      {columns.map((column, index) => (
        <div
          key={index}
          className={styles.label}
          style={{ width: column.size }}
          title={column.label}
        >
          {column.label}

          {column.sortable && (
            <IconButton
              icon={getSortIcon(column.label)}
              color={AccentColors.Secondary}
              onClick={() => handleSortClick(column.label)}
              title={getSortTitle(column.label)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Columns;
