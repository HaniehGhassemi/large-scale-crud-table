import Typography from '@/components/Typography/Typography';
import styles from './Pagination.module.scss';
import { FontSize, Variant } from '@/shared/types/enums';
import { useEffect, useMemo, useState } from 'react';
import { PaginationProps } from '../../Table.types';

const Pagination: React.FC<PaginationProps> = ({
  onSelectedPageSize,
  total,
  onSelectedPage,
}) => {
  const [pageSize, setPageSize] = useState<number>(15);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize],
  );

  const pageOptions = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  const firstIndex = useMemo(
    () => (total === 0 ? 0 : (selectedPage - 1) * pageSize + 1),
    [selectedPage, pageSize, total],
  );

  const lastIndex = useMemo(
    () => Math.min(selectedPage * pageSize, total),
    [selectedPage, pageSize, total],
  );

  useEffect(() => {
    onSelectedPageSize(pageSize);
    setSelectedPage(1);
  }, [pageSize, onSelectedPageSize]);

  useEffect(() => {
    onSelectedPage(selectedPage);
  }, [selectedPage, onSelectedPage]);

  useEffect(() => {
    setSelectedPage(1);
  }, [total]);

  return (
    <div className={styles.tfoot}>
      <div className={styles.pageSize}>
        <Typography
          variant={Variant.P}
          text="Items per page:"
          fontSize={FontSize.Mini}
          fontWeight={400}
        />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className={styles.select}
        >
          {[15, 20, 40].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <Typography
        variant={Variant.P}
        text={`Showing ${firstIndex}-${lastIndex} from ${total}`}
        fontSize={FontSize.Mini}
      />

      <div className={styles.pagination}>
        <Typography
          variant={Variant.P}
          text="Current page:"
          fontSize={FontSize.Mini}
        />
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(Number(e.target.value))}
          className={styles.select}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
