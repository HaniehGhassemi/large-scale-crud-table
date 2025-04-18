export interface Category {
  id: number;
  title: string;
}

export interface GetAllCategoriesResponse {
  data: Category[];
}
