import { prisma } from "@/lib/prisma";

export async function productGroupDeleteRepository(id: string) {
  return prisma.productGroup.delete({
    where: { id },
    select: { id: true },
  });
}
