import {
  evaluationTemplateGetByCodeRepository,
  evaluationTemplateGetByIdRepository,
} from "../repositories/evaluation-template-create.repository";
import {
  evaluationTemplateToggleStatusRepository,
  evaluationTemplateUpdateRepository,
} from "../repositories/evaluation-template-update.repository";
import type { EvaluationTemplateUpdateInput } from "../schemas/evaluation-template-create.schema";

export async function evaluationTemplateUpdateService(
  input: EvaluationTemplateUpdateInput,
) {
  const template = await evaluationTemplateGetByIdRepository(input.id);
  if (!template) {
    throw new Error("Evaluation template not found");
  }

  const existing = await evaluationTemplateGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Evaluation template code already exists");
  }

  return evaluationTemplateUpdateRepository(input);
}

export async function evaluationTemplateToggleStatusService(id: string) {
  const template = await evaluationTemplateGetByIdRepository(id);
  if (!template) {
    throw new Error("Evaluation template not found");
  }

  return evaluationTemplateToggleStatusRepository(id);
}
