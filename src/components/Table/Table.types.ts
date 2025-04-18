import { SortOrder } from '@/shared/types/enums';
import { ActionButton } from '@/shared/types/types';
import { ReactNode } from 'react';

export interface Column {
  label: string;
  size: string;
  sort?: (order: SortOrder) => void;
}

export interface Cell {
  value: string | number | ReactNode;
}

export interface Row {
  id: number;
  cells: Cell[];
}

export interface PaginationProps {
  onSelectedPageSize: (size: number) => void;
  onSelectedPage: (page: number) => void;
  total: number;
}

export interface TableProps {
  columns: Column[];
  rows: Row[];
  pagination?: PaginationProps;
  action?: ActionButton;
  search?: {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
  };

  filter?: {
    isOpen: boolean;
    body: ReactNode;
    onOpen: (open: boolean) => void;
  };
}
