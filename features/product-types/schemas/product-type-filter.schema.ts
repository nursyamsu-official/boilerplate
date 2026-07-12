import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const productTypeSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const productTypeSortOrderValues = ["asc", "desc"] as const;
export const productTypeActiveFilterValues = ["all", "true", "false"] as const;

export const productTypeFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(productTypeSortByValues).default("code"),
  sortOrder: z.enum(productTypeSortOrderValues).default("asc"),
  isActive: z.enum(productTypeActiveFilterValues).default("all"),
});

export type ProductTypeFilterInput = z.infer<typeof productTypeFilterSchema>;

export function parseProductTypeFilter(
  searchParams: Record<string, string | string[] | undefined>,
): ProductTypeFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return productTypeFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
