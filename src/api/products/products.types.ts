import { SortOrder } from '@/shared/types/enums';
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
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  sortOrder?: SortOrder;
  sortBy?: string;
}

export interface GetAllProductsResponse {
  data: Product[];
  meta: Meta;
}

export interface CreateNewProductsRequestBody {
  title: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  rating: number;
}

export interface GetProductDetailsResponse {
  data: Product;
}

export interface UpdateProductsRequestBody {
  title: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  rating: number;
}
