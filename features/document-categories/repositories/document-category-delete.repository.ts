import { prisma } from "@/lib/prisma";

export async function documentCategoryDeleteRepository(id: string) {
  return prisma.documentCategory.delete({
    where: { id },
    select: { id: true },
  });
}
