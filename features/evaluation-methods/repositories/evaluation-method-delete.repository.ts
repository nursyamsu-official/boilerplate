import { prisma } from "@/lib/prisma";

export async function evaluationMethodDeleteRepository(id: string) {
  return prisma.evaluationMethod.delete({
    where: { id },
    select: { id: true },
  });
}
