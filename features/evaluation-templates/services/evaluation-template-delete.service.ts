import {
  evaluationTemplateCountCriteriaRepository,
  evaluationTemplateGetByIdRepository,
} from "../repositories/evaluation-template-create.repository";
import { evaluationTemplateDeleteRepository } from "../repositories/evaluation-template-delete.repository";

export async function evaluationTemplateDeleteService(id: string) {
  const template = await evaluationTemplateGetByIdRepository(id);
  if (!template) {
    throw new Error("Evaluation template not found");
  }

  const criteriaCount = await evaluationTemplateCountCriteriaRepository(id);
  if (criteriaCount > 0) {
    throw new Error("Cannot delete evaluation template with criteria");
  }

  return evaluationTemplateDeleteRepository(id);
}
