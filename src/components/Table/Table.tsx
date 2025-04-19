import Columns from './components/Columns/Columns';
import Rows from './components/Rows/Rows';
import { TableProps } from './Table.types';
import styles from './Table.module.scss';
import Pagination from './components/Pagination/Pagination';
import Modal from '../Modal/Modal';
import TableHeader from './components/TableHeader/TableHeader';

const Table: React.FC<TableProps> = ({
  search,
  action,
  columns,
  rows,
  pagination,
  filter,
  onSortChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <TableHeader search={search} action={action} filter={filter} />

      <div className={styles.table}>
        <Columns columns={columns} onSortChange={onSortChange} />
        <Rows column={columns} rows={rows} onSortChange={onSortChange} />
      </div>

      {pagination && (
        <Pagination
          onSelectedPageSize={pagination.onSelectedPageSize}
          onSelectedPage={pagination.onSelectedPage}
          total={pagination.total}
        />
      )}

      {filter && (
        <Modal
          isOpen={filter.isOpen}
          title={'Choose Filters'}
          body={filter.body}
          onClose={() => filter.onOpen(false)}
          className={styles.filterModal}
        />
      )}
    </div>
  );
};

export default Table;
