import type { RoleFilterInput } from "../schemas/role-filter.schema";

export type RoleTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  isSystem: boolean;
  permissionCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleListResult = {
  items: RoleTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type RoleDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  isSystem: boolean;
  permissionIds: string[];
};

export type RoleFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  permissionIds: string[];
};

export type RoleListFilters = RoleFilterInput;

export type RoleOption = {
  id: string;
  code: string;
  name: string;
};
