import { ApiResponse, fetchData } from '../useFetch';
import { GetAllProductsResponse } from './products.types';
import CONSTANTS from '@/shared/types/constants';
import { ApiMethod } from '@/shared/types/enums';

const { PRODUCTS } = CONSTANTS.API_ENTITY_URLS;

export const fetchGetAllProducts = async (): Promise<
  ApiResponse<GetAllProductsResponse>
> => {
  return await fetchData(`${PRODUCTS}/all`, {
    method: ApiMethod.Get,
  });
};
