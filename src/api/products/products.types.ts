import { Meta } from '@/shared/types/types';

export interface Product {
  id: number;
  title: string;
  category: string;
  date: string; // ISO format
  price: number;
  description: string;
  stock: number;
  rating: number;
}

export interface GetAllProductsQueryParams {
  page: number;
  pageSize: number;
}

export interface GetAllProductsResponse {
  data: Product[];
  meta: Meta;
}
