import { prisma } from "@/lib/prisma";

import type { EvaluationTemplateCreateInput } from "../schemas/evaluation-template-create.schema";

export async function evaluationTemplateCreateRepository(
  input: EvaluationTemplateCreateInput,
) {
  return prisma.evaluationTemplate.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      evaluationMethodId: input.evaluationMethodId,
      evaluationScoringMethodId: input.evaluationScoringMethodId,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function evaluationTemplateGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.evaluationTemplate.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function evaluationTemplateGetByIdRepository(id: string) {
  return prisma.evaluationTemplate.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      evaluationMethodId: true,
      evaluationScoringMethodId: true,
      isActive: true,
    },
  });
}

export async function evaluationTemplateCountCriteriaRepository(id: string) {
  return prisma.evaluationCriteria.count({
    where: { templateId: id },
  });
}
