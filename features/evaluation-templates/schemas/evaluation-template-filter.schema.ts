import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const evaluationTemplateSortByValues = [
  "code",
  "name",
  "createdAt",
  "updatedAt",
] as const;
export const evaluationTemplateSortOrderValues = ["asc", "desc"] as const;
export const evaluationTemplateActiveFilterValues = ["all", "true", "false"] as const;

const evaluationTemplateRelationFilterSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid filter id",
  );

export const evaluationTemplateFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(evaluationTemplateSortByValues).default("code"),
  sortOrder: z.enum(evaluationTemplateSortOrderValues).default("asc"),
  isActive: z.enum(evaluationTemplateActiveFilterValues).default("all"),
  evaluationMethodId: evaluationTemplateRelationFilterSchema,
  evaluationScoringMethodId: evaluationTemplateRelationFilterSchema,
});

export type EvaluationTemplateFilterInput = z.infer<
  typeof evaluationTemplateFilterSchema
>;

export function parseEvaluationTemplateFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EvaluationTemplateFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return evaluationTemplateFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    evaluationMethodId: getValue("evaluationMethodId") ?? "all",
    evaluationScoringMethodId: getValue("evaluationScoringMethodId") ?? "all",
  });
}
