import { ApiResponse, fetchData } from '../useFetch';
import {
  CreateNewProductsRequestBody,
  GetAllProductsQueryParams,
  GetAllProductsResponse,
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
): Promise<ApiResponse<GetAllProductsResponse>> => {
  return await fetchData(`${PRODUCTS}/create`, {
    method: ApiMethod.Post,
    body: JSON.stringify(body),
  });
};
