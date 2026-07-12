import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const productCategorySortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const productCategorySortOrderValues = ["asc", "desc"] as const;
export const productCategoryActiveFilterValues = ["all", "true", "false"] as const;

const productCategoryGroupIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid product group id",
  );

export const productCategoryFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(productCategorySortByValues).default("code"),
  sortOrder: z.enum(productCategorySortOrderValues).default("asc"),
  isActive: z.enum(productCategoryActiveFilterValues).default("all"),
  groupId: productCategoryGroupIdSchema,
});

export type ProductCategoryFilterInput = z.infer<typeof productCategoryFilterSchema>;

export function parseProductCategoryFilter(
  searchParams: Record<string, string | string[] | undefined>,
): ProductCategoryFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return productCategoryFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    groupId: getValue("groupId") ?? "all",
  });
}
