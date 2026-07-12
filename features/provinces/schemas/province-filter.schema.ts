import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const provinceSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const provinceSortOrderValues = ["asc", "desc"] as const;
export const provinceActiveFilterValues = ["all", "true", "false"] as const;

const provinceCountryIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid country id",
  );

export const provinceFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(provinceSortByValues).default("code"),
  sortOrder: z.enum(provinceSortOrderValues).default("asc"),
  isActive: z.enum(provinceActiveFilterValues).default("all"),
  countryId: provinceCountryIdSchema,
});

export type ProvinceFilterInput = z.infer<typeof provinceFilterSchema>;

export function parseProvinceFilter(
  searchParams: Record<string, string | string[] | undefined>,
): ProvinceFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return provinceFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    countryId: getValue("countryId") ?? "all",
  });
}
