import { evaluationTemplateGetByIdRepository } from "../repositories/evaluation-template-create.repository";
import type { EvaluationTemplateDetail } from "../types/evaluation-template.type";

export async function evaluationTemplateGetByIdService(
  id: string,
): Promise<EvaluationTemplateDetail> {
  const template = await evaluationTemplateGetByIdRepository(id);
  if (!template) {
    throw new Error("Evaluation template not found");
  }

  return {
    id: template.id,
    code: template.code,
    name: template.name,
    description: template.description,
    evaluationMethodId: template.evaluationMethodId,
    evaluationScoringMethodId: template.evaluationScoringMethodId,
    isActive: template.isActive,
  };
}
