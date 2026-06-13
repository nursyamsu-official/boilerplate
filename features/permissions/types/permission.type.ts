import type { PermissionFilterInput } from "../schemas/permission-filter.schema";

export type PermissionTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  moduleId: string | null;
  moduleCode: string | null;
  moduleName: string | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PermissionListResult = {
  items: PermissionTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type PermissionDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  moduleId: string | null;
  isSystem: boolean;
};

export type PermissionFormValues = {
  code: string;
  name: string;
  description: string | null;
  moduleId: string | null;
};

export type PermissionListFilters = PermissionFilterInput;
