import { ListQueryParams } from '../../types/types';

export const getProperQueryString = (queryParams: ListQueryParams) => {
  const queryString = Object.keys(queryParams)
    .map((key) => {
      const value = queryParams[key as keyof ListQueryParams];

      if (value !== undefined) {
        if (Array.isArray(value)) {
          // If the value is an array, create multiple segments with the same key
          return value
            .map((item) => `${key}=${encodeURIComponent(item)}`)
            .join('&');
        } else {
          // Otherwise, treat it as a single value
          return `${key}=${encodeURIComponent(value.toString())}`;
        }
      }
    })
    .join('&');

  return queryString;
};
