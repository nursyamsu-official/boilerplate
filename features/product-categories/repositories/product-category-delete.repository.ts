import { prisma } from "@/lib/prisma";

export async function productCategoryDeleteRepository(id: string) {
  return prisma.productCategory.delete({
    where: { id },
    select: { id: true },
  });
}
