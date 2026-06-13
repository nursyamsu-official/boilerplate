import type { ApiKeyFilterInput } from "../schemas/api-key.schema";

export type ApiKeyUserSummary = {
  id: string;
  name: string;
  email: string;
};

export type ApiKeyTableRow = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  prefix: string;
  scopes: string | null;
  isActive: boolean;
  lastUsedAt: Date | null;
  lastUsedIp: string | null;
  expiresAt: Date | null;
  revokedAt: Date | null;
  revokedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: ApiKeyUserSummary;
};

export type ApiKeyListResult = {
  items: ApiKeyTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type ApiKeyListFilters = ApiKeyFilterInput;

export type ApiKeyDetail = ApiKeyTableRow;

export type ApiKeyCreateResult = {
  apiKey: ApiKeyTableRow;
  rawKey: string;
};

export type { ApiKeyFormValues } from "../schemas/api-key.schema";
