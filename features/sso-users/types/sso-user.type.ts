import type { SsoUserFilterInput } from "../schemas/sso-user-filter.schema";

export type SsoUserTableRow = {
  id: string;
  userId: string;
  providerId: string;
  externalId: string;
  emailAtProvider: string | null;
  displayName: string | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  provider: {
    id: string;
    code: string;
    name: string;
  };
};

export type SsoUserListResult = {
  items: SsoUserTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type SsoUserDetail = {
  id: string;
  userId: string;
  providerId: string;
  externalId: string;
  emailAtProvider: string | null;
  displayName: string | null;
  rawProfile: string | null;
};

export type SsoUserFormValues = {
  userId: string;
  providerId: string;
  externalId: string;
  emailAtProvider: string;
  displayName: string;
  rawProfile: string;
};

export type SsoUserListFilters = SsoUserFilterInput;
