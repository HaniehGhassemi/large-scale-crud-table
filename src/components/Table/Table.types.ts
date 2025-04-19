import { ActionButton, Sort } from '@/shared/types/types';
import { ReactNode } from 'react';

export interface Column {
  label: string;
  size: string;
  sortable?: boolean;
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

export interface Search {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}
export interface Filter {
  isOpen: boolean;
  body: ReactNode;
  onOpen: (open: boolean) => void;
}

export interface TableProps {
  columns: Column[];
  rows: Row[];
  pagination?: PaginationProps;
  action?: ActionButton;
  search?: Search;
  filter?: Filter;
  onSortChange?: (sort?: Sort) => void;
}
