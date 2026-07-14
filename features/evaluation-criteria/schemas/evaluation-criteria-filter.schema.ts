import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const evaluationCriteriaSortByValues = [
  "templateName",
  "code",
  "name",
  "sortOrder",
  "createdAt",
  "updatedAt",
] as const;
export const evaluationCriteriaSortOrderValues = ["asc", "desc"] as const;
export const evaluationCriteriaActiveFilterValues = ["all", "true", "false"] as const;

const evaluationCriteriaGroupIdSchema = z
  .string()
  .default("all")
  .refine(
    (value) => value === "all" || z.string().uuid().safeParse(value).success,
    "Invalid evaluation template id",
  );

export const evaluationCriteriaFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(evaluationCriteriaSortByValues).default("code"),
  sortOrder: z.enum(evaluationCriteriaSortOrderValues).default("asc"),
  isActive: z.enum(evaluationCriteriaActiveFilterValues).default("all"),
  templateId: evaluationCriteriaGroupIdSchema,
});

export type EvaluationCriteriaFilterInput = z.infer<typeof evaluationCriteriaFilterSchema>;

export function parseEvaluationCriteriaFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EvaluationCriteriaFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return evaluationCriteriaFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
    templateId: getValue("templateId") ?? "all",
  });
}
