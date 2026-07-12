import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const evaluationMethodSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const evaluationMethodSortOrderValues = ["asc", "desc"] as const;
export const evaluationMethodActiveFilterValues = ["all", "true", "false"] as const;

export const evaluationMethodFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(evaluationMethodSortByValues).default("code"),
  sortOrder: z.enum(evaluationMethodSortOrderValues).default("asc"),
  isActive: z.enum(evaluationMethodActiveFilterValues).default("all"),
});

export type EvaluationMethodFilterInput = z.infer<typeof evaluationMethodFilterSchema>;

export function parseEvaluationMethodFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EvaluationMethodFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return evaluationMethodFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
