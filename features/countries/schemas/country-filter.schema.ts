import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const countrySortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const countrySortOrderValues = ["asc", "desc"] as const;
export const countryActiveFilterValues = ["all", "true", "false"] as const;

export const countryFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(countrySortByValues).default("code"),
  sortOrder: z.enum(countrySortOrderValues).default("asc"),
  isActive: z.enum(countryActiveFilterValues).default("all"),
});

export type CountryFilterInput = z.infer<typeof countryFilterSchema>;

export function parseCountryFilter(
  searchParams: Record<string, string | string[] | undefined>,
): CountryFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return countryFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
