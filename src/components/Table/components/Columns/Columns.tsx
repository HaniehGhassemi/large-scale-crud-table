import { Column } from '../../Table.types';
import styles from './Columns.module.scss';

interface ColumnsProps {
  columns: Column[];
}

const Columns: React.FC<ColumnsProps> = ({ columns }) => {
  return (
    <div className={styles.columns}>
      <span className={styles.countable}>#</span>

      {columns.map((column, index) => (
        <div
          key={index}
          className={styles.label}
          style={{ width: column.size }}
          title={column.label}
        >
          {column.label}
        </div>
      ))}
    </div>
  );
};

export default Columns;
