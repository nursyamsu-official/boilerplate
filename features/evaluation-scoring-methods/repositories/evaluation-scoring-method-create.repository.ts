import { prisma } from "@/lib/prisma";

import type { EvaluationScoringMethodCreateInput } from "../schemas/evaluation-scoring-method-create.schema";

export async function evaluationScoringMethodCreateRepository(input: EvaluationScoringMethodCreateInput) {
  return prisma.evaluationScoringMethod.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function evaluationScoringMethodGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.evaluationScoringMethod.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function evaluationScoringMethodGetByIdRepository(id: string) {
  return prisma.evaluationScoringMethod.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { templates: true } },
    },
  });
}

export async function evaluationScoringMethodCountTemplatesRepository(id: string) {
  return prisma.evaluationTemplate.count({
    where: { evaluationScoringMethodId: id },
  });
}
