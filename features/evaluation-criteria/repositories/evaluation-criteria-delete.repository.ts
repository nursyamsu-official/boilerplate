import { prisma } from "@/lib/prisma";

export async function evaluationCriteriaDeleteRepository(id: string) {
  return prisma.evaluationCriteria.delete({
    where: { id },
    select: { id: true },
  });
}
