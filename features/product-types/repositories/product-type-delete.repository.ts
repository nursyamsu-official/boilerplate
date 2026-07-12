import { prisma } from "@/lib/prisma";

export async function productTypeDeleteRepository(id: string) {
  return prisma.productType.delete({
    where: { id },
    select: { id: true },
  });
}
