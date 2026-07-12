import { prisma } from "@/lib/prisma";

export async function documentTypeDeleteRepository(id: string) {
  return prisma.documentType.delete({
    where: { id },
    select: { id: true },
  });
}
