import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const uomGlobalConversionSortByValues = [
  "conversionFactor",
  "createdAt",
  "updatedAt",
] as const;
export const uomGlobalConversionSortOrderValues = ["asc", "desc"] as const;
export const uomGlobalConversionActiveFilterValues = [
  "all",
  "true",
  "false",
] as const;

const uomIdFilterSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid UOM id",
  );

export const uomGlobalConversionFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(uomGlobalConversionSortByValues).default("updatedAt"),
  sortOrder: z.enum(uomGlobalConversionSortOrderValues).default("desc"),
  isActive: z.enum(uomGlobalConversionActiveFilterValues).default("all"),
  fromUomId: uomIdFilterSchema,
  toUomId: uomIdFilterSchema,
});

export type UomGlobalConversionFilterInput = z.infer<
  typeof uomGlobalConversionFilterSchema
>;

export function parseUomGlobalConversionFilter(
  searchParams: Record<string, string | string[] | undefined>,
): UomGlobalConversionFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return uomGlobalConversionFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "updatedAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    isActive: getValue("isActive") ?? "all",
    fromUomId: getValue("fromUomId") ?? "all",
    toUomId: getValue("toUomId") ?? "all",
  });
}
