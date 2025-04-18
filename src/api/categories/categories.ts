import { ApiResponse, fetchData } from '../useFetch';
import CONSTANTS from '@/shared/types/constants';
import { ApiMethod } from '@/shared/types/enums';
import { GetAllCategoriesResponse } from './categories.types';

const { CATEGORIES } = CONSTANTS.API_ENTITY_URLS;

export const fetchGetAllCategories = async (): Promise<
  ApiResponse<GetAllCategoriesResponse>
> => {
  return await fetchData(`${CATEGORIES}/all`, {
    method: ApiMethod.Get,
  });
};
