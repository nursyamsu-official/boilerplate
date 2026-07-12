import type { DocumentCategoryFilterInput } from "../schemas/document-category-filter.schema";

export type DocumentCategoryTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  documentTypeCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentCategoryListResult = {
  items: DocumentCategoryTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type DocumentCategoryDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type DocumentCategoryFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type DocumentCategoryListFilters = DocumentCategoryFilterInput;

export type DocumentCategoryOption = {
  id: string;
  code: string;
  name: string;
};
