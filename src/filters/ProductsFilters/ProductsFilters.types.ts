export interface ProductFilterItems {
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface ProductsFiltersProps {
  onAppliedFilters: (filters: ProductFilterItems) => void;
  appliedFilters?: ProductFilterItems;
  submit: () => void;
}
