import type { MenuFilterInput } from "../schemas/menu-filter.schema";

export type MenuParentSummary = {
  id: string;
  code: string;
  label: string;
};

export type MenuTableRow = {
  id: string;
  code: string;
  label: string;
  path: string | null;
  icon: string | null;
  parentId: string | null;
  parentLabel: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuListResult = {
  items: MenuTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type MenuDetail = {
  id: string;
  code: string;
  label: string;
  path: string | null;
  icon: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type MenuParentOption = {
  id: string;
  code: string;
  label: string;
  parentId: string | null;
};

export type MenuFormValues = {
  code: string;
  label: string;
  path: string | null;
  icon: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type MenuListFilters = MenuFilterInput;
