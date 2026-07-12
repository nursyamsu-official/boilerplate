import {
  evaluationMethodCreateRepository,
  evaluationMethodGetByCodeRepository,
} from "../repositories/evaluation-method-create.repository";
import type { EvaluationMethodCreateInput } from "../schemas/evaluation-method-create.schema";

export async function evaluationMethodCreateService(input: EvaluationMethodCreateInput) {
  const existing = await evaluationMethodGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Evaluation method code already exists");
  }

  return evaluationMethodCreateRepository(input);
}
