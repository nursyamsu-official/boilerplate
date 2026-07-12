import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const districtSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const districtSortOrderValues = ["asc", "desc"] as const;
export const districtActiveFilterValues = ["all", "true", "false"] as const;

const districtCountryIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid country id",
  );

const districtProvinceIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid province id",
  );

export const districtFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(districtSortByValues).default("code"),
  sortOrder: z.enum(districtSortOrderValues).default("asc"),
  isActive: z.enum(districtActiveFilterValues).default("all"),
  countryId: districtCountryIdSchema,
  provinceId: districtProvinceIdSchema,
});

export type DistrictFilterInput = z.infer<typeof districtFilterSchema>;

export function parseDistrictFilter(
  searchParams: Record<string, string | string[] | undefined>,
): DistrictFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return districtFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    countryId: getValue("countryId") ?? "all",
    provinceId: getValue("provinceId") ?? "all",
  });
}
