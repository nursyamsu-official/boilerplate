import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const productGroupSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const productGroupSortOrderValues = ["asc", "desc"] as const;
export const productGroupActiveFilterValues = ["all", "true", "false"] as const;

export const productGroupFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(productGroupSortByValues).default("code"),
  sortOrder: z.enum(productGroupSortOrderValues).default("asc"),
  isActive: z.enum(productGroupActiveFilterValues).default("all"),
});

export type ProductGroupFilterInput = z.infer<typeof productGroupFilterSchema>;

export function parseProductGroupFilter(
  searchParams: Record<string, string | string[] | undefined>,
): ProductGroupFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return productGroupFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
