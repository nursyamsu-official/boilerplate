import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const permissionSortByValues = ["code", "name", "createdAt"] as const;
export const permissionSortOrderValues = ["asc", "desc"] as const;

export const permissionFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(permissionSortByValues).default("code"),
  sortOrder: z.enum(permissionSortOrderValues).default("asc"),
  moduleId: z.string().default("all"),
});

export type PermissionFilterInput = z.infer<typeof permissionFilterSchema>;

export function parsePermissionFilter(
  searchParams: Record<string, string | string[] | undefined>,
): PermissionFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return permissionFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    moduleId: getValue("moduleId") ?? "all",
  });
}
