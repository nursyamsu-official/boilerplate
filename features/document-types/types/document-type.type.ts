import type { DocumentTypeFilterInput } from "../schemas/document-type-filter.schema";

export type DocumentTypeTableRow = {
  id: string;
  categoryId: string;
  categoryName: string;
  code: string;
  name: string;
  description: string | null;
  numberPrefix: string;
  numberSeparator: string;
  numberStart: number;
  numberEnd: number;
  numberCurrent: number;
  numberPadding: number;
  numberPreview: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentTypeListResult = {
  items: DocumentTypeTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type DocumentTypeDetail = {
  id: string;
  categoryId: string;
  code: string;
  name: string;
  description: string | null;
  numberPrefix: string;
  numberSeparator: string;
  numberStart: number;
  numberEnd: number;
  numberCurrent: number;
  numberPadding: number;
  isActive: boolean;
};

export type DocumentTypeFormValues = {
  categoryId: string;
  code: string;
  name: string;
  description: string | null;
  numberPrefix: string;
  numberSeparator: string;
  numberStart: number;
  numberEnd: number;
  numberCurrent: number;
  numberPadding: number;
  isActive: boolean;
};

export type DocumentTypeListFilters = DocumentTypeFilterInput;

export type DocumentTypeOption = {
  id: string;
  code: string;
  name: string;
  categoryId: string;
};
