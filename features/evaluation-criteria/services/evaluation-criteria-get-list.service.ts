import { evaluationCriteriaListRepository } from "../repositories/evaluation-criteria-list.repository";
import type { EvaluationCriteriaListFilters } from "../types/evaluation-criteria.type";

export async function evaluationCriteriaGetListService(filters: EvaluationCriteriaListFilters) {
  return evaluationCriteriaListRepository(filters);
}
