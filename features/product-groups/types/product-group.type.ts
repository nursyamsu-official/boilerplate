import type { ProductGroupFilterInput } from "../schemas/product-group-filter.schema";

export type ProductGroupTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  productCount: number;
  categoryCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductGroupListResult = {
  items: ProductGroupTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductGroupDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProductGroupFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProductGroupListFilters = ProductGroupFilterInput;

export type ProductGroupOption = {
  id: string;
  code: string;
  name: string;
};
