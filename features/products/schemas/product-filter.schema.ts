import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const productSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const productSortOrderValues = ["asc", "desc"] as const;
export const productActiveFilterValues = ["all", "true", "false"] as const;

const productRelationFilterSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid filter id",
  );

export const productFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(productSortByValues).default("code"),
  sortOrder: z.enum(productSortOrderValues).default("asc"),
  isActive: z.enum(productActiveFilterValues).default("all"),
  productTypeId: productRelationFilterSchema,
  productGroupId: productRelationFilterSchema,
  productCategoryId: productRelationFilterSchema,
});

export type ProductFilterInput = z.infer<typeof productFilterSchema>;

export function parseProductFilter(
  searchParams: Record<string, string | string[] | undefined>,
): ProductFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return productFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    productTypeId: getValue("productTypeId") ?? "all",
    productGroupId: getValue("productGroupId") ?? "all",
    productCategoryId: getValue("productCategoryId") ?? "all",
  });
}
