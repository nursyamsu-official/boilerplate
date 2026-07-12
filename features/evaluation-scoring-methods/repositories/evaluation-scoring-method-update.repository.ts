import { prisma } from "@/lib/prisma";

import type { EvaluationScoringMethodUpdateInput } from "../schemas/evaluation-scoring-method-create.schema";

export async function evaluationScoringMethodUpdateRepository(input: EvaluationScoringMethodUpdateInput) {
  return prisma.evaluationScoringMethod.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function evaluationScoringMethodToggleStatusRepository(id: string) {
  const current = await prisma.evaluationScoringMethod.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.evaluationScoringMethod.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
