import {
  evaluationMethodCountTemplatesRepository,
  evaluationMethodGetByIdRepository,
} from "../repositories/evaluation-method-create.repository";
import { evaluationMethodDeleteRepository } from "../repositories/evaluation-method-delete.repository";

export async function evaluationMethodDeleteService(id: string) {
  const method = await evaluationMethodGetByIdRepository(id);
  if (!method) {
    throw new Error("Evaluation method not found");
  }

  const templateCount = await evaluationMethodCountTemplatesRepository(id);
  if (templateCount > 0) {
    throw new Error("Cannot delete evaluation method with templates");
  }

  return evaluationMethodDeleteRepository(id);
}
