import { useMediaQuery } from 'react-responsive';
import { Column, Row } from '../../Table.types';
import styles from './Rows.module.scss';
import CONSTANTS from '@/shared/types/constants';

interface RowsProps {
  column: Column[];
  rows: Row[];
}

const Rows: React.FC<RowsProps> = ({ column, rows }) => {
  const isLargeScreen = useMediaQuery({ minWidth: CONSTANTS.BREAKPOINTS.LG });

  return (
    <div className={styles.tbody}>
      {rows.map((row, index) => (
        <div key={row.id} className={styles.row}>
          <span className={styles.countable}>{index + 1}</span>

          {row.cells.map((cell, index) => (
            <div
              key={index}
              className={styles.cell}
              style={isLargeScreen ? { width: column[index]?.size } : {}}
            >
              {isLargeScreen ? (
                <span className={styles.value}>{cell.value}</span>
              ) : (
                <div className={styles.cellContent}>
                  <span className={styles.label}>{column[index]?.label}</span>
                  <span className={styles.value}>{cell.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Rows;
