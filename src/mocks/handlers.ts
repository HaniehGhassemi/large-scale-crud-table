import { http, HttpResponse } from 'msw';
import products from './data/products.json';
import categories from './data/categories.json';
import {
  CreateNewProductsRequestBody,
  Product,
  UpdateProductsRequestBody,
} from '../api/products/products.types';
import CONSTANTS from '@/shared/types/constants';

const BASE_URL: string = import.meta.env.VITE_APP_API || '';
const { PRODUCTS, CATEGORIES } = CONSTANTS.API_ENTITY_URLS;

const memoryProducts: Product[] = [...products];

export const handlers = [
  http.get(`${BASE_URL}${PRODUCTS}/all`, () => {
    try {
      if (!products || products.length === 0) {
        return HttpResponse.json(
          {
            data: null,
            error: 'Products not found',
          },
          { status: 404 },
        );
      }

      return HttpResponse.json({
        data: products,
      });
    } catch {
      return HttpResponse.json(
        {
          data: null,
          error: 'Internal server error',
        },
        { status: 500 },
      );
    }
  }),

  http.get(`${BASE_URL}${PRODUCTS}/:id`, ({ params }) => {
    try {
      const { id } = params;
      const productId = parseInt(id as string, 10);

      const product = memoryProducts.find((p) => p.id === productId);

      if (!product) {
        return HttpResponse.json(
          {
            data: null,
            error: 'Product not found',
          },
          { status: 404 },
        );
      }

      return HttpResponse.json({ data: product });
    } catch {
      return HttpResponse.json(
        {
          data: null,
          error: 'Internal server error',
        },
        { status: 500 },
      );
    }
  }),

  http.put(`${BASE_URL}${PRODUCTS}/update/:id`, async ({ request, params }) => {
    try {
      const { id } = params;
      const productId = parseInt(id as string, 10);

      const body = (await request.json()) as UpdateProductsRequestBody;

      const index = memoryProducts.findIndex((p) => p.id === productId);

      if (index === -1) {
        return HttpResponse.json(
          {
            data: null,
            error: 'Product not found',
          },
          { status: 404 },
        );
      }

      const updatedProduct: Product = {
        ...memoryProducts[index],
        ...body,
        date: new Date().toISOString(),
      };

      memoryProducts[index] = updatedProduct;

      return HttpResponse.json({ data: updatedProduct }, { status: 200 });
    } catch {
      return HttpResponse.json(
        {
          data: null,
          error: 'Internal server error',
        },
        { status: 500 },
      );
    }
  }),

  http.post(`${BASE_URL}${PRODUCTS}/create`, async ({ request }) => {
    try {
      const body = (await request.json()) as CreateNewProductsRequestBody;

      // simple validation
      const requiredFields = [
        'title',
        'category',
        'price',
        'description',
        'stock',
        'rating',
      ];

      const missingField = requiredFields.find((field) => !(field in body));

      if (missingField) {
        return HttpResponse.json(
          {
            data: null,
            error: `Missing required field: ${missingField}`,
          },
          { status: 400 },
        );
      }

      const newProduct: Product = {
        id: Math.max(0, ...memoryProducts.map((p) => p.id)) + 1,
        date: new Date().toISOString(),
        ...body,
      };

      memoryProducts.push(newProduct);

      return HttpResponse.json(
        {
          data: newProduct,
        },
        { status: 201 },
      );
    } catch {
      return HttpResponse.json(
        {
          data: null,
          error: 'Invalid request body',
        },
        { status: 400 },
      );
    }
  }),

  http.delete(`${BASE_URL}${PRODUCTS}/delete/:id`, ({ params }) => {
    try {
      const { id } = params;
      const productId = parseInt(id as string, 10);

      const productIndex = memoryProducts.findIndex((p) => p.id === productId);

      if (productIndex === -1) {
        return HttpResponse.json(
          {
            data: null,
            error: 'Product not found',
          },
          { status: 404 },
        );
      }

      memoryProducts.splice(productIndex, 1);

      return HttpResponse.json({ data: {} });
    } catch {
      return HttpResponse.json(
        {
          data: null,
          error: 'Internal server error',
        },
        { status: 500 },
      );
    }
  }),

  http.get(`${BASE_URL}${CATEGORIES}/all`, () => {
    try {
      if (!categories || categories.length === 0) {
        return HttpResponse.json(
          {
            data: null,
            error: 'Categories not found',
          },
          { status: 404 },
        );
      }

      return HttpResponse.json({
        data: categories,
      });
    } catch {
      return HttpResponse.json(
        {
          data: null,
          error: 'Internal server error',
        },
        { status: 500 },
      );
    }
  }),
];
