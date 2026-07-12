import { prisma } from "@/lib/prisma";

import type { EvaluationMethodCreateInput } from "../schemas/evaluation-method-create.schema";

export async function evaluationMethodCreateRepository(input: EvaluationMethodCreateInput) {
  return prisma.evaluationMethod.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function evaluationMethodGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.evaluationMethod.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function evaluationMethodGetByIdRepository(id: string) {
  return prisma.evaluationMethod.findUnique({
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

export async function evaluationMethodCountTemplatesRepository(id: string) {
  return prisma.evaluationTemplate.count({
    where: { evaluationMethodId: id },
  });
}
