import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const documentTypeSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const documentTypeSortOrderValues = ["asc", "desc"] as const;
export const documentTypeActiveFilterValues = ["all", "true", "false"] as const;

const documentTypeCategoryIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid category id",
  );

export const documentTypeFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(documentTypeSortByValues).default("code"),
  sortOrder: z.enum(documentTypeSortOrderValues).default("asc"),
  isActive: z.enum(documentTypeActiveFilterValues).default("all"),
  categoryId: documentTypeCategoryIdSchema,
});

export type DocumentTypeFilterInput = z.infer<typeof documentTypeFilterSchema>;

export function parseDocumentTypeFilter(
  searchParams: Record<string, string | string[] | undefined>,
): DocumentTypeFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return documentTypeFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    categoryId: getValue("categoryId") ?? "all",
  });
}
