import { prisma } from "@/lib/prisma";

import type { EvaluationCriteriaCreateInput } from "../schemas/evaluation-criteria-create.schema";

export async function evaluationCriteriaCreateRepository(
  input: EvaluationCriteriaCreateInput,
) {
  return prisma.evaluationCriteria.create({
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

export async function evaluationCriteriaGetByCodeRepository(
  templateId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.evaluationCriteria.findFirst({
    where: {
      templateId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function evaluationCriteriaGetByIdRepository(id: string) {
  return prisma.evaluationCriteria.findUnique({
    where: { id },
    select: {
      id: true,
      templateId: true,
      code: true,
      name: true,
      description: true,
      weight: true,
      maxScore: true,
      sortOrder: true,
      isActive: true,
    },
  });
}

export async function evaluationCriteriaTemplateExistsRepository(id: string) {
  return prisma.evaluationTemplate.findUnique({
    where: { id },
    select: { id: true },
  });
}
