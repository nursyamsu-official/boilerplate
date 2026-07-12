import {
  evaluationMethodGetByCodeRepository,
  evaluationMethodGetByIdRepository,
} from "../repositories/evaluation-method-create.repository";
import {
  evaluationMethodToggleStatusRepository,
  evaluationMethodUpdateRepository,
} from "../repositories/evaluation-method-update.repository";
import type { EvaluationMethodUpdateInput } from "../schemas/evaluation-method-create.schema";

export async function evaluationMethodUpdateService(input: EvaluationMethodUpdateInput) {
  const country = await evaluationMethodGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Evaluation method not found");
  }

  const existing = await evaluationMethodGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Evaluation method code already exists");
  }

  return evaluationMethodUpdateRepository(input);
}

export async function evaluationMethodToggleStatusService(id: string) {
  const country = await evaluationMethodGetByIdRepository(id);
  if (!country) {
    throw new Error("Evaluation method not found");
  }

  return evaluationMethodToggleStatusRepository(id);
}
