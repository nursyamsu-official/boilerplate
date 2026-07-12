import type { ProductCategoryFilterInput } from "../schemas/product-category-filter.schema";

export type ProductCategoryTableRow = {
  id: string;
  groupId: string;
  groupName: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductCategoryListResult = {
  items: ProductCategoryTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductCategoryDetail = {
  id: string;
  groupId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProductCategoryFormValues = {
  groupId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProductCategoryListFilters = ProductCategoryFilterInput;

export type ProductCategoryOption = {
  id: string;
  code: string;
  name: string;
  groupId: string;
};
