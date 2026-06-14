import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const ssoUserSortByValues = [
  "createdAt",
  "updatedAt",
  "lastLoginAt",
  "externalId",
] as const;
export const ssoUserSortOrderValues = ["asc", "desc"] as const;

export const ssoUserFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(ssoUserSortByValues).default("createdAt"),
  sortOrder: z.enum(ssoUserSortOrderValues).default("desc"),
  providerId: z.string().default("all"),
});

export type SsoUserFilterInput = z.infer<typeof ssoUserFilterSchema>;

export function parseSsoUserFilter(
  searchParams: Record<string, string | string[] | undefined>,
): SsoUserFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return ssoUserFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    providerId: getValue("providerId") ?? "all",
  });
}
