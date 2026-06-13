import type { PermissionModuleFilterInput } from "../schemas/permission-module-filter.schema";

export type PermissionModuleTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
  isSystem: boolean;
  permissionCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PermissionModuleListResult = {
  items: PermissionModuleTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type PermissionModuleDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
  isSystem: boolean;
};

export type PermissionModuleFormValues = {
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type PermissionModuleListFilters = PermissionModuleFilterInput;

export type PermissionModuleOption = {
  id: string;
  code: string;
  name: string;
};
