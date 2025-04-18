import { http, HttpResponse } from 'msw';
import products from './data/products.json';
import categories from './data/categories.json';
import { Product } from '../api/products/products.types';
import CONSTANTS from '@/shared/types/constants';

const BASE_URL: string = import.meta.env.VITE_APP_API || '';
const { PRODUCTS, CATEGORIES } = CONSTANTS.API_ENTITY_URLS;

export const handlers = [
  http.get(`${BASE_URL}${PRODUCTS}/all`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const minPrice = parseFloat(url.searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(url.searchParams.get('maxPrice') || 'Infinity');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const category = url.searchParams.get('category')?.toLowerCase();

    let filteredProducts = products as Product[];

    // filter by search term (title)
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(search),
      );
    }

    // filter by price range
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    // filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category,
      );
    }

    // filter by date range
    if (startDate) {
      filteredProducts = filteredProducts.filter(
        (product) => new Date(product.date) >= new Date(startDate),
      );
    }

    if (endDate) {
      filteredProducts = filteredProducts.filter(
        (product) => new Date(product.date) <= new Date(endDate),
      );
    }

    const total = filteredProducts.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedProducts = filteredProducts.slice(start, end);

    return HttpResponse.json({
      data: paginatedProducts,
      meta: {
        page,
        pageSize,
        total,
      },
    });
  }),

  http.get(`${BASE_URL}${CATEGORIES}/all`, () => {
    return HttpResponse.json({
      data: categories,
    });
  }),
];
