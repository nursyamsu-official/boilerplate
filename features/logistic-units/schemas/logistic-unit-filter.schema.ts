import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const logisticUnitSortByValues = [
  "code",
  "name",
  "sortOrder",
  "createdAt",
  "updatedAt",
] as const;
export const logisticUnitSortOrderValues = ["asc", "desc"] as const;
export const logisticUnitActiveFilterValues = ["all", "true", "false"] as const;

const logisticUnitCompanyIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid company id",
  );

export const logisticUnitFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(logisticUnitSortByValues).default("sortOrder"),
  sortOrder: z.enum(logisticUnitSortOrderValues).default("asc"),
  isActive: z.enum(logisticUnitActiveFilterValues).default("all"),
  companyId: logisticUnitCompanyIdSchema,
});

export type LogisticUnitFilterInput = z.infer<
  typeof logisticUnitFilterSchema
>;

export function parseLogisticUnitFilter(
  searchParams: Record<string, string | string[] | undefined>,
): LogisticUnitFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return logisticUnitFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "sortOrder",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    companyId: getValue("companyId") ?? "all",
  });
}
