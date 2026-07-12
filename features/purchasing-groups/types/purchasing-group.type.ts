import type { PurchasingGroupFilterInput } from "../schemas/purchasing-group-filter.schema";

export type PurchasingGroupTableRow = {
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

export type PurchasingGroupListResult = {
  items: PurchasingGroupTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type PurchasingGroupDetail = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type PurchasingGroupFormValues = {
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type PurchasingGroupParentOption = {
  id: string;
  code: string;
  name: string;
  parentId: string | null;
};

export type PurchasingGroupPreviewItem = {
  id: string;
  code: string;
  name: string;
  companyId: string;
  companyName: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type PurchasingGroupTreeNode = PurchasingGroupPreviewItem & {
  children: PurchasingGroupTreeNode[];
};

export type PurchasingGroupListFilters = PurchasingGroupFilterInput;
