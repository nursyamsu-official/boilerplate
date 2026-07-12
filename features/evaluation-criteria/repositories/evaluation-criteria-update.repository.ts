import { prisma } from "@/lib/prisma";

import type { EvaluationCriteriaUpdateInput } from "../schemas/evaluation-criteria-create.schema";

export async function evaluationCriteriaUpdateRepository(
  input: EvaluationCriteriaUpdateInput,
) {
  return prisma.evaluationCriteria.update({
    where: { id: input.id },
    data: {
      templateId: input.templateId,
      code: input.code,
      name: input.name,
      description: input.description,
      weight: input.weight,
      maxScore: input.maxScore,
      sortOrder: input.sortOrder,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function evaluationCriteriaToggleStatusRepository(id: string) {
  const current = await prisma.evaluationCriteria.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.evaluationCriteria.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
