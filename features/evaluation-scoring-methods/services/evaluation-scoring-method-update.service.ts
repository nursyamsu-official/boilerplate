import {
  evaluationScoringMethodGetByCodeRepository,
  evaluationScoringMethodGetByIdRepository,
} from "../repositories/evaluation-scoring-method-create.repository";
import {
  evaluationScoringMethodToggleStatusRepository,
  evaluationScoringMethodUpdateRepository,
} from "../repositories/evaluation-scoring-method-update.repository";
import type { EvaluationScoringMethodUpdateInput } from "../schemas/evaluation-scoring-method-create.schema";

export async function evaluationScoringMethodUpdateService(input: EvaluationScoringMethodUpdateInput) {
  const country = await evaluationScoringMethodGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Scoring method not found");
  }

  const existing = await evaluationScoringMethodGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Scoring method code already exists");
  }

  return evaluationScoringMethodUpdateRepository(input);
}

export async function evaluationScoringMethodToggleStatusService(id: string) {
  const country = await evaluationScoringMethodGetByIdRepository(id);
  if (!country) {
    throw new Error("Scoring method not found");
  }

  return evaluationScoringMethodToggleStatusRepository(id);
}
