import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const permissionModuleSortByValues = [
  "code",
  "name",
  "sortOrder",
  "createdAt",
] as const;
export const permissionModuleSortOrderValues = ["asc", "desc"] as const;
export const permissionModuleActiveFilterValues = ["all", "true", "false"] as const;

export const permissionModuleFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(permissionModuleSortByValues).default("sortOrder"),
  sortOrder: z.enum(permissionModuleSortOrderValues).default("asc"),
  isActive: z.enum(permissionModuleActiveFilterValues).default("all"),
});

export type PermissionModuleFilterInput = z.infer<
  typeof permissionModuleFilterSchema
>;

export function parsePermissionModuleFilter(
  searchParams: Record<string, string | string[] | undefined>,
): PermissionModuleFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return permissionModuleFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "sortOrder",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
