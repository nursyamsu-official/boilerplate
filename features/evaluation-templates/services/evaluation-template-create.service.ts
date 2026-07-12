import {
  evaluationTemplateCreateRepository,
  evaluationTemplateGetByCodeRepository,
} from "../repositories/evaluation-template-create.repository";
import type { EvaluationTemplateCreateInput } from "../schemas/evaluation-template-create.schema";

export async function evaluationTemplateCreateService(
  input: EvaluationTemplateCreateInput,
) {
  const existing = await evaluationTemplateGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Evaluation template code already exists");
  }

  return evaluationTemplateCreateRepository(input);
}
