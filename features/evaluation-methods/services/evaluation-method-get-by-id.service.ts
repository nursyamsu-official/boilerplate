import { evaluationMethodGetByIdRepository } from "../repositories/evaluation-method-create.repository";
import type { EvaluationMethodDetail } from "../types/evaluation-method.type";

export async function evaluationMethodGetByIdService(id: string): Promise<EvaluationMethodDetail> {
  const country = await evaluationMethodGetByIdRepository(id);
  if (!country) {
    throw new Error("Evaluation method not found");
  }

  return {
    id: country.id,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
