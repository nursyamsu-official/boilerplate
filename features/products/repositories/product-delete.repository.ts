import { prisma } from "@/lib/prisma";

export async function productDeleteRepository(id: string) {
  return prisma.product.delete({
    where: { id },
    select: { id: true },
  });
}
