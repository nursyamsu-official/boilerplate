import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const companySortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const companySortOrderValues = ["asc", "desc"] as const;
export const companyActiveFilterValues = ["all", "true", "false"] as const;

export const companyFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(companySortByValues).default("code"),
  sortOrder: z.enum(companySortOrderValues).default("asc"),
  isActive: z.enum(companyActiveFilterValues).default("all"),
});

export type CompanyFilterInput = z.infer<typeof companyFilterSchema>;

export function parseCompanyFilter(
  searchParams: Record<string, string | string[] | undefined>,
): CompanyFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return companyFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
