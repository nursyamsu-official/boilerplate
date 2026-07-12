import {
  evaluationScoringMethodCreateRepository,
  evaluationScoringMethodGetByCodeRepository,
} from "../repositories/evaluation-scoring-method-create.repository";
import type { EvaluationScoringMethodCreateInput } from "../schemas/evaluation-scoring-method-create.schema";

export async function evaluationScoringMethodCreateService(input: EvaluationScoringMethodCreateInput) {
  const existing = await evaluationScoringMethodGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Scoring method code already exists");
  }

  return evaluationScoringMethodCreateRepository(input);
}
