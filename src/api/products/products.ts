import { ApiResponse, fetchData } from '../useFetch';
import {
  CreateNewProductsRequestBody,
  GetAllProductsQueryParams,
  GetAllProductsResponse,
  GetProductDetailsResponse,
  UpdateProductsRequestBody,
} from './products.types';
import { getProperQueryString } from '@/shared/utils/fetchUtils';
import CONSTANTS from '@/shared/types/constants';
import { ApiMethod } from '@/shared/types/enums';

const { PRODUCTS } = CONSTANTS.API_ENTITY_URLS;

export const fetchGetAllProducts = async (
  query: GetAllProductsQueryParams,
): Promise<ApiResponse<GetAllProductsResponse>> => {
  return await fetchData(`${PRODUCTS}/all?${getProperQueryString(query)}`, {
    method: ApiMethod.Get,
  });
};

export const fetchCreateNewProducts = async (
  body: CreateNewProductsRequestBody,
): Promise<ApiResponse<GetProductDetailsResponse>> => {
  return await fetchData(`${PRODUCTS}/create`, {
    method: ApiMethod.Post,
    body: JSON.stringify(body),
  });
};

export const fetchGetProductDetails = async (
  id: number,
): Promise<ApiResponse<GetProductDetailsResponse>> => {
  return await fetchData(`${PRODUCTS}/${id}`, {
    method: ApiMethod.Get,
  });
};

export const fetchUpdateProducts = async (
  id: number,
  body: UpdateProductsRequestBody,
): Promise<ApiResponse<GetProductDetailsResponse>> => {
  return await fetchData(`${PRODUCTS}/update/${id}`, {
    method: ApiMethod.Put,
    body: JSON.stringify(body),
  });
};

export const fetchDeleteProduct = async (
  id: number,
): Promise<ApiResponse<GetProductDetailsResponse>> => {
  return await fetchData(`${PRODUCTS}/delete/${id}`, {
    method: ApiMethod.Delete,
  });
};
