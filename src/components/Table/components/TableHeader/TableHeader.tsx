import { FilterIcon, SearchIcon } from '@/assets/icons';
import Input from '@/components/Fields/Input/Input';
import IconButton from '@/components/Buttons/IconButton/IconButton';
import ThemeToggle from '@/components/Buttons/ThemeToggle/ThemeToggle';
import { ActionButton } from '@/shared/types/types';
import { Search, Filter } from '../../Table.types';
import styles from './TableHeader.module.scss';
import CONSTANTS from '@/shared/types/constants';
import { useMediaQuery } from 'react-responsive';
import { AccentColors } from '@/shared/types/enums';

interface TableHeaderProps {
  search?: Search;
  filter?: Filter;
  action?: ActionButton;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  search,
  filter,
  action,
}) => {
  const isLargeScreen = useMediaQuery({ minWidth: CONSTANTS.BREAKPOINTS.LG });

  return (
    (search || action || filter) && (
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
            icon={<FilterIcon />}
            onClick={() => filter.onOpen(true)}
            title="filters"
            color={
              isLargeScreen ? AccentColors.Primary : AccentColors.Secondary
            }
          />
        )}

        {action && (
          <IconButton
            icon={action.icon}
            onClick={action.onClick}
            title={action.label}
            color={
              isLargeScreen ? AccentColors.Primary : AccentColors.Secondary
            }
          />
        )}

        <ThemeToggle />
      </div>
    )
  );
};

export default TableHeader;
