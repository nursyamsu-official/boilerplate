import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const organizationalUnitSortByValues = [
  "code",
  "name",
  "sortOrder",
  "createdAt",
  "updatedAt",
] as const;
export const organizationalUnitSortOrderValues = ["asc", "desc"] as const;
export const organizationalUnitActiveFilterValues = ["all", "true", "false"] as const;

const organizationalUnitCompanyIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid company id",
  );

export const organizationalUnitFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(organizationalUnitSortByValues).default("sortOrder"),
  sortOrder: z.enum(organizationalUnitSortOrderValues).default("asc"),
  isActive: z.enum(organizationalUnitActiveFilterValues).default("all"),
  companyId: organizationalUnitCompanyIdSchema,
});

export type OrganizationalUnitFilterInput = z.infer<
  typeof organizationalUnitFilterSchema
>;

export function parseOrganizationalUnitFilter(
  searchParams: Record<string, string | string[] | undefined>,
): OrganizationalUnitFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return organizationalUnitFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "sortOrder",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    companyId: getValue("companyId") ?? "all",
  });
}
