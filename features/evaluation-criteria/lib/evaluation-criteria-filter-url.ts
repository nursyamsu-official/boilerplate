import type { EvaluationCriteriaFilterInput } from "../schemas/evaluation-criteria-filter.schema";

export function buildEvaluationCriteriaListUrl(filters: EvaluationCriteriaFilterInput): string {
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

  if (filters.templateId !== "all") {
    params.set("templateId", filters.templateId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/evaluation/evaluation-criteria?${query}`
    : "/dashboard/admin-page/evaluation/evaluation-criteria";
}
