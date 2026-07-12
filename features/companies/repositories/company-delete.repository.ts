import { prisma } from "@/lib/prisma";

export async function companyDeleteRepository(id: string) {
  return prisma.company.delete({
    where: { id },
    select: { id: true },
  });
}
