import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const evaluationScoringMethodSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const evaluationScoringMethodSortOrderValues = ["asc", "desc"] as const;
export const evaluationScoringMethodActiveFilterValues = ["all", "true", "false"] as const;

export const evaluationScoringMethodFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(evaluationScoringMethodSortByValues).default("code"),
  sortOrder: z.enum(evaluationScoringMethodSortOrderValues).default("asc"),
  isActive: z.enum(evaluationScoringMethodActiveFilterValues).default("all"),
});

export type EvaluationScoringMethodFilterInput = z.infer<typeof evaluationScoringMethodFilterSchema>;

export function parseEvaluationScoringMethodFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EvaluationScoringMethodFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return evaluationScoringMethodFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
