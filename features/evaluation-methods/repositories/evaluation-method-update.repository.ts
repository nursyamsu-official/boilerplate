import { prisma } from "@/lib/prisma";

import type { EvaluationMethodUpdateInput } from "../schemas/evaluation-method-create.schema";

export async function evaluationMethodUpdateRepository(input: EvaluationMethodUpdateInput) {
  return prisma.evaluationMethod.update({
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

export async function evaluationMethodToggleStatusRepository(id: string) {
  const current = await prisma.evaluationMethod.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.evaluationMethod.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
