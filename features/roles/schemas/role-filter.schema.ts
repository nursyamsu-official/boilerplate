import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const roleSortByValues = ["code", "name", "createdAt"] as const;
export const roleSortOrderValues = ["asc", "desc"] as const;
export const roleActiveFilterValues = ["all", "true", "false"] as const;

export const roleFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(roleSortByValues).default("code"),
  sortOrder: z.enum(roleSortOrderValues).default("asc"),
  isActive: z.enum(roleActiveFilterValues).default("all"),
});

export type RoleFilterInput = z.infer<typeof roleFilterSchema>;

export function parseRoleFilter(
  searchParams: Record<string, string | string[] | undefined>,
): RoleFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return roleFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
