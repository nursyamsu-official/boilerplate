import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const menuSortByValues = ["code", "label", "sortOrder", "createdAt"] as const;
export const menuSortOrderValues = ["asc", "desc"] as const;
export const menuActiveFilterValues = ["all", "true", "false"] as const;

export const menuFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(menuSortByValues).default("sortOrder"),
  sortOrder: z.enum(menuSortOrderValues).default("asc"),
  isActive: z.enum(menuActiveFilterValues).default("all"),
});

export type MenuFilterInput = z.infer<typeof menuFilterSchema>;

export function parseMenuFilter(
  searchParams: Record<string, string | string[] | undefined>,
): MenuFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return menuFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "sortOrder",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
