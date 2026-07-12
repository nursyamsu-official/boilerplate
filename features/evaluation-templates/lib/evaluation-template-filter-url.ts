import type { EvaluationTemplateFilterInput } from "../schemas/evaluation-template-filter.schema";

export function buildEvaluationTemplateListUrl(
  filters: EvaluationTemplateFilterInput,
): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.isActive !== "all") {
    params.set("isActive", filters.isActive);
  }

  if (filters.evaluationMethodId !== "all") {
    params.set("evaluationMethodId", filters.evaluationMethodId);
  }

  if (filters.evaluationScoringMethodId !== "all") {
    params.set("evaluationScoringMethodId", filters.evaluationScoringMethodId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/evaluation/evaluation-templates?${query}`
    : "/dashboard/admin-page/evaluation/evaluation-templates";
}
