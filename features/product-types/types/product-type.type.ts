import type { ProductTypeFilterInput } from "../schemas/product-type-filter.schema";

export type ProductTypeTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductTypeListResult = {
  items: ProductTypeTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductTypeDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProductTypeFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProductTypeListFilters = ProductTypeFilterInput;

export type ProductTypeOption = {
  id: string;
  code: string;
  name: string;
};
