import { evaluationScoringMethodGetByIdRepository } from "../repositories/evaluation-scoring-method-create.repository";
import type { EvaluationScoringMethodDetail } from "../types/evaluation-scoring-method.type";

export async function evaluationScoringMethodGetByIdService(id: string): Promise<EvaluationScoringMethodDetail> {
  const country = await evaluationScoringMethodGetByIdRepository(id);
  if (!country) {
    throw new Error("Scoring method not found");
  }

  return {
    id: country.id,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
