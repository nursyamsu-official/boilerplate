import { evaluationTemplateListRepository } from "../repositories/evaluation-template-list.repository";
import type { EvaluationTemplateListFilters } from "../types/evaluation-template.type";

export async function evaluationTemplateGetListService(
  filters: EvaluationTemplateListFilters,
) {
  return evaluationTemplateListRepository(filters);
}
