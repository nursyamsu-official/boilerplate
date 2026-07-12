import { evaluationCriteriaGetByIdRepository } from "../repositories/evaluation-criteria-create.repository";
import type { EvaluationCriteriaDetail } from "../types/evaluation-criteria.type";

export async function evaluationCriteriaGetByIdService(id: string): Promise<EvaluationCriteriaDetail> {
  const criterion = await evaluationCriteriaGetByIdRepository(id);
  if (!criterion) {
    throw new Error("Evaluation criterion not found");
  }

  return {
    id: criterion.id,
    templateId: criterion.templateId,
    code: criterion.code,
    name: criterion.name,
    description: criterion.description,
    weight: Number(criterion.weight),
    maxScore: criterion.maxScore === null ? null : Number(criterion.maxScore),
    sortOrder: criterion.sortOrder,
    isActive: criterion.isActive,
  };
}
