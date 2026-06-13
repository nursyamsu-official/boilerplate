import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const apiKeySortByValues = [
  "createdAt",
  "name",
  "expiresAt",
  "lastUsedAt",
] as const;
export const apiKeySortOrderValues = ["asc", "desc"] as const;
export const apiKeyStatusFilterValues = [
  "all",
  "active",
  "inactive",
  "revoked",
  "expired",
] as const;

export const apiKeyFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(apiKeySortByValues).default("createdAt"),
  sortOrder: z.enum(apiKeySortOrderValues).default("desc"),
  status: z.enum(apiKeyStatusFilterValues).default("all"),
});

export type ApiKeyFilterInput = z.infer<typeof apiKeyFilterSchema>;

export function parseApiKeyFilter(
  searchParams: Record<string, string | string[] | undefined>,
): ApiKeyFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return apiKeyFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}

export const apiKeyFormFieldsSchema = z.object({
  userId: z.string().min(1, "User is required"),
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  scopes: z.string().trim().max(1000).optional().or(z.literal("")),
  expiresAt: z.string().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export const apiKeyCreateSchema = apiKeyFormFieldsSchema;

export const apiKeyUpdateSchema = apiKeyFormFieldsSchema.extend({
  id: z.string().uuid(),
});

export const apiKeyDeleteSchema = z.object({
  id: z.string().uuid(),
});

export const apiKeyRevokeSchema = z.object({
  id: z.string().uuid(),
});

export type ApiKeyFormValues = z.infer<typeof apiKeyFormFieldsSchema>;
