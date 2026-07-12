import type { LogisticUnitFilterInput } from "../schemas/logistic-unit-filter.schema";

export type LogisticUnitTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  companyId: string;
  companyName: string;
  parentId: string | null;
  parentName: string | null;
  sortOrder: number;
  isActive: boolean;
  childCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type LogisticUnitListResult = {
  items: LogisticUnitTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type LogisticUnitDetail = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type LogisticUnitFormValues = {
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type LogisticUnitParentOption = {
  id: string;
  code: string;
  name: string;
  parentId: string | null;
};

export type LogisticUnitPreviewItem = {
  id: string;
  code: string;
  name: string;
  companyId: string;
  companyName: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type LogisticUnitTreeNode = LogisticUnitPreviewItem & {
  children: LogisticUnitTreeNode[];
};

export type LogisticUnitListFilters = LogisticUnitFilterInput;
