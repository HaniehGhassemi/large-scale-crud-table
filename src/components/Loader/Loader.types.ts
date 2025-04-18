import { AccentColors } from '@/shared/types/enums';

export enum LoaderSizes {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export interface LoaderProps {
  size?: LoaderSizes;
  color?: AccentColors;
}
