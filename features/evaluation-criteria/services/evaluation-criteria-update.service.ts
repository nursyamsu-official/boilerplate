import {
  evaluationCriteriaGetByCodeRepository,
  evaluationCriteriaGetByIdRepository,
} from "../repositories/evaluation-criteria-create.repository";
import {
  evaluationCriteriaToggleStatusRepository,
  evaluationCriteriaUpdateRepository,
} from "../repositories/evaluation-criteria-update.repository";
import type { EvaluationCriteriaUpdateInput } from "../schemas/evaluation-criteria-create.schema";

export async function evaluationCriteriaUpdateService(input: EvaluationCriteriaUpdateInput) {
  const country = await evaluationCriteriaGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Evaluation criterion not found");
  }

  const existing = await evaluationCriteriaGetByCodeRepository(input.templateId, input.code, input.id);
  if (existing) {
    throw new Error("Evaluation criterion code already exists");
  }

  return evaluationCriteriaUpdateRepository(input);
}

export async function evaluationCriteriaToggleStatusService(id: string) {
  const country = await evaluationCriteriaGetByIdRepository(id);
  if (!country) {
    throw new Error("Evaluation criterion not found");
  }

  return evaluationCriteriaToggleStatusRepository(id);
}
