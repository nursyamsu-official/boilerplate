import { evaluationCriteriaGetByIdRepository } from "../repositories/evaluation-criteria-create.repository";
import { evaluationCriteriaDeleteRepository } from "../repositories/evaluation-criteria-delete.repository";

export async function evaluationCriteriaDeleteService(id: string) {
  const criterion = await evaluationCriteriaGetByIdRepository(id);
  if (!criterion) {
    throw new Error("Evaluation criterion not found");
  }

  return evaluationCriteriaDeleteRepository(id);
}
