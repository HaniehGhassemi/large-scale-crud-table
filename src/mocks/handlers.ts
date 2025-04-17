import { http, HttpResponse } from 'msw';
import products from './data/products.json';
import { Product } from '../api/products/products.types';
import CONSTANTS from '@/shared/types/constants';

const BASE_URL: string = import.meta.env.VITE_APP_API || '';
const { PRODUCTS } = CONSTANTS.API_ENTITY_URLS;

export const handlers = [
  http.get(`${BASE_URL}${PRODUCTS}/all`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedProducts = (products as Product[]).slice(start, end);

    return HttpResponse.json({
      data: paginatedProducts,
      pagination: {
        page,
        pageSize,
        total: products.length,
      },
    });
  }),
];
