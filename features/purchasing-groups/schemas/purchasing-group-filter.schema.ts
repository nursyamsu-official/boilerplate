import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const purchasingGroupSortByValues = [
  "code",
  "name",
  "sortOrder",
  "createdAt",
  "updatedAt",
] as const;
export const purchasingGroupSortOrderValues = ["asc", "desc"] as const;
export const purchasingGroupActiveFilterValues = ["all", "true", "false"] as const;

const purchasingGroupCompanyIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid company id",
  );

export const purchasingGroupFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(purchasingGroupSortByValues).default("sortOrder"),
  sortOrder: z.enum(purchasingGroupSortOrderValues).default("asc"),
  isActive: z.enum(purchasingGroupActiveFilterValues).default("all"),
  companyId: purchasingGroupCompanyIdSchema,
});

export type PurchasingGroupFilterInput = z.infer<
  typeof purchasingGroupFilterSchema
>;

export function parsePurchasingGroupFilter(
  searchParams: Record<string, string | string[] | undefined>,
): PurchasingGroupFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return purchasingGroupFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "sortOrder",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    companyId: getValue("companyId") ?? "all",
  });
}
