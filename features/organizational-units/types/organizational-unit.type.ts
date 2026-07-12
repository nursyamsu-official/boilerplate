import type { OrganizationalUnitFilterInput } from "../schemas/organizational-unit-filter.schema";

export type OrganizationalUnitTableRow = {
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

export type OrganizationalUnitListResult = {
  items: OrganizationalUnitTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type OrganizationalUnitDetail = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type OrganizationalUnitFormValues = {
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type OrganizationalUnitParentOption = {
  id: string;
  code: string;
  name: string;
  parentId: string | null;
};

export type OrganizationalUnitPreviewItem = {
  id: string;
  code: string;
  name: string;
  companyId: string;
  companyName: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type OrganizationalUnitTreeNode = OrganizationalUnitPreviewItem & {
  children: OrganizationalUnitTreeNode[];
};

export type OrganizationalUnitListFilters = OrganizationalUnitFilterInput;
