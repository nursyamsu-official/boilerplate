import { evaluationScoringMethodListRepository } from "../repositories/evaluation-scoring-method-list.repository";
import type { EvaluationScoringMethodListFilters } from "../types/evaluation-scoring-method.type";

export async function evaluationScoringMethodGetListService(filters: EvaluationScoringMethodListFilters) {
  return evaluationScoringMethodListRepository(filters);
}
