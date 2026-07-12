import { z } from "zod";

import { appConfig } from "@/config/app.config";

import { UOM_TYPE_VALUES } from "../constants/uom.constants";

export const uomSortByValues = [
  "code",
  "name",
  "uomType",
  "createdAt",
  "updatedAt",
] as const;
export const uomSortOrderValues = ["asc", "desc"] as const;
export const uomActiveFilterValues = ["all", "true", "false"] as const;

const uomTypeFilterValues = ["all", ...UOM_TYPE_VALUES] as const;

export const uomFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(uomSortByValues).default("code"),
  sortOrder: z.enum(uomSortOrderValues).default("asc"),
  isActive: z.enum(uomActiveFilterValues).default("all"),
  uomType: z.enum(uomTypeFilterValues).default("all"),
});

export type UomFilterInput = z.infer<typeof uomFilterSchema>;

export function parseUomFilter(
  searchParams: Record<string, string | string[] | undefined>,
): UomFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return uomFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    uomType: getValue("uomType") ?? "all",
  });
}
