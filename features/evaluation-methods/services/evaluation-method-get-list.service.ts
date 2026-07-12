import { evaluationMethodListRepository } from "../repositories/evaluation-method-list.repository";
import type { EvaluationMethodListFilters } from "../types/evaluation-method.type";

export async function evaluationMethodGetListService(filters: EvaluationMethodListFilters) {
  return evaluationMethodListRepository(filters);
}
