/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ApiMethod } from '@/shared/types/enums';
import { toast } from 'react-toastify';

const BASE_URL: string = import.meta.env.VITE_APP_API || '';

interface FetchOptions {
  method: ApiMethod;
  body?: string | FormData;
  headers?: {};
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const fetchData = async <T>(
  url: string,
  options: FetchOptions = {
    method: ApiMethod.Get,
  },
  headers: {} = {
    'Content-Type': 'application/json',
  },
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: options.method,
      headers: headers,
      body: options.body,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error);
      return {
        data: null,
        error: data.error,
      };
    }

    return { data: data, error: null };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
