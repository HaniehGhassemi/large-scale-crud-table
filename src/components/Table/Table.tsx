import { SearchIcon } from '@/assets/icons';
import Columns from './components/Columns/Columns';
import Rows from './components/Rows/Rows';
import Input from '@/components/Fields/Input/Input';
import { TableProps } from './Table.types';
import IconButton from '../IconButton/IconButton';
import Filter from '@/assets/icons/Filter';
import styles from './Table.module.scss';
import Pagination from './components/Pagination/Pagination';
import Modal from '../Modal/Modal';

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
      {(search || action || filter) && (
        <div className={styles.header}>
          {search && (
            <Input
              type="text"
              icon={<SearchIcon />}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeHolder={search.placeholder}
            />
          )}
          {filter && (
            <IconButton
              icon={<Filter />}
              onClick={() => filter.onOpen(true)}
              title="filters"
            />
          )}

          {action && (
            <IconButton
              icon={action.icon}
              onClick={action.onClick}
              title={action.label}
              color={action.color}
            />
          )}
        </div>
      )}
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
