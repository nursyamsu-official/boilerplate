import type { ProductFilterInput } from "../schemas/product-filter.schema";

export type ProductTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  productTypeId: string;
  typeName: string;
  productGroupId: string;
  groupName: string;
  productCategoryId: string;
  categoryName: string;
  baseUomId: string | null;
  baseUomCode: string | null;
  baseUomSymbol: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductListResult = {
  items: ProductTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  productTypeId: string;
  productGroupId: string;
  productCategoryId: string;
  baseUomId: string | null;
  isActive: boolean;
};

export type ProductFormValues = {
  code: string;
  name: string;
  description: string | null;
  productTypeId: string;
  productGroupId: string;
  productCategoryId: string;
  baseUomId: string | null;
  isActive: boolean;
};

export type ProductListFilters = ProductFilterInput;
