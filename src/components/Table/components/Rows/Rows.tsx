import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import IconButton from '@/components/Buttons/IconButton/IconButton';
import { Column, Row } from '../../Table.types';
import styles from './Rows.module.scss';
import CONSTANTS from '@/shared/types/constants';
import { SortOrder } from '@/shared/types/enums';
import { Sort } from '@/shared/types/types';
import { SortIcon, ArrowTopIcon, ArrowDownIcon } from '@/assets/icons';
import { AccentColors } from '@/shared/types/enums';

interface RowsProps {
  column: Column[];
  rows: Row[];
  onSortChange?: (sort?: Sort) => void;
}

const Rows: React.FC<RowsProps> = ({ column, rows, onSortChange }) => {
  const isLargeScreen = useMediaQuery({ minWidth: CONSTANTS.BREAKPOINTS.LG });

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

  const RowRenderer = ({ index, style }: ListChildComponentProps) => {
    const row = rows[index];
    return (
      <div key={row.id} className={styles.row} style={style}>
        {row.cells.map((cell, colIndex) => {
          const col = column[colIndex];
          return (
            <div
              key={colIndex}
              className={styles.cell}
              style={isLargeScreen ? { width: col?.size } : {}}
            >
              {isLargeScreen ? (
                <span className={styles.value}>{cell.value}</span>
              ) : (
                <div className={styles.cellContent}>
                  <span className={styles.label}>
                    {col?.label}

                    {col?.sortable && (
                      <IconButton
                        icon={getSortIcon(col.label)}
                        color={AccentColors.Secondary}
                        onClick={() => handleSortClick(col.label)}
                        title={getSortTitle(col.label)}
                      />
                    )}
                  </span>
                  <span className={styles.value}>{cell.value}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const ROW_HEIGHT = isLargeScreen ? 48 : 250;
  const ROW_COUNTS = isLargeScreen ? 13 : 4;
  const LIST_HEIGHT = Math.min(rows.length, ROW_COUNTS) * ROW_HEIGHT;

  return (
    <div className={styles.tbody}>
      <List
        height={LIST_HEIGHT}
        itemCount={rows.length}
        itemSize={ROW_HEIGHT}
        width="100%"
      >
        {RowRenderer}
      </List>
    </div>
  );
};

export default Rows;
