import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const documentCategorySortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const documentCategorySortOrderValues = ["asc", "desc"] as const;
export const documentCategoryActiveFilterValues = ["all", "true", "false"] as const;

export const documentCategoryFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(documentCategorySortByValues).default("code"),
  sortOrder: z.enum(documentCategorySortOrderValues).default("asc"),
  isActive: z.enum(documentCategoryActiveFilterValues).default("all"),
});

export type DocumentCategoryFilterInput = z.infer<typeof documentCategoryFilterSchema>;

export function parseDocumentCategoryFilter(
  searchParams: Record<string, string | string[] | undefined>,
): DocumentCategoryFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return documentCategoryFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
