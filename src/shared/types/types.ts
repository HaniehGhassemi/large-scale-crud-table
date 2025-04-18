import { ReactNode } from 'react';
import { AccentColors } from './enums';

export interface Meta {
  page: number;
  pageSize: number;
  total: number;
}

export interface ListQueryParams {
  page?: number;
  pageSize?: number;
}

export interface ActionButton {
  color?: AccentColors;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface SelectOption {
  value: string | number;
  title: string;
}
