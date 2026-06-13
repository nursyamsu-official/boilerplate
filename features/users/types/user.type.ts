import type { UserFilterInput } from "../schemas/user-filter.schema";
import type { userStatusValues } from "../schemas/user-create.schema";

export type UserStatus = (typeof userStatusValues)[number];

export type UserTableRow = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  status: UserStatus;
  roleNames: string;
  lastLoginAt: Date | null;
  createdAt: Date;
};

export type UserListResult = {
  items: UserTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type UserDetail = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  status: UserStatus;
  roleIds: string[];
};

export type UserFormValues = {
  name: string;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  status: UserStatus;
  roleIds: string[];
  password?: string;
};

export type UserListFilters = UserFilterInput;
