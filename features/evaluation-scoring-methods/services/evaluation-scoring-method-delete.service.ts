import {
  evaluationScoringMethodCountTemplatesRepository,
  evaluationScoringMethodGetByIdRepository,
} from "../repositories/evaluation-scoring-method-create.repository";
import { evaluationScoringMethodDeleteRepository } from "../repositories/evaluation-scoring-method-delete.repository";

export async function evaluationScoringMethodDeleteService(id: string) {
  const scoringMethod = await evaluationScoringMethodGetByIdRepository(id);
  if (!scoringMethod) {
    throw new Error("Scoring method not found");
  }

  const templateCount = await evaluationScoringMethodCountTemplatesRepository(id);
  if (templateCount > 0) {
    throw new Error("Cannot delete scoring method with templates");
  }

  return evaluationScoringMethodDeleteRepository(id);
}
