import {
  evaluationCriteriaCreateRepository,
  evaluationCriteriaGetByCodeRepository,
  evaluationCriteriaTemplateExistsRepository,
} from "../repositories/evaluation-criteria-create.repository";
import type { EvaluationCriteriaCreateInput } from "../schemas/evaluation-criteria-create.schema";

export async function evaluationCriteriaCreateService(
  input: EvaluationCriteriaCreateInput,
) {
  const template = await evaluationCriteriaTemplateExistsRepository(input.templateId);
  if (!template) {
    throw new Error("Evaluation template not found");
  }

  const existing = await evaluationCriteriaGetByCodeRepository(
    input.templateId,
    input.code,
  );
  if (existing) {
    throw new Error("Evaluation criterion code already exists in this template");
  }

  return evaluationCriteriaCreateRepository(input);
}
