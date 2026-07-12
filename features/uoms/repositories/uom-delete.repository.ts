import { prisma } from "@/lib/prisma";

export async function uomDeleteRepository(id: string) {
  return prisma.uom.delete({
    where: { id },
    select: { id: true },
  });
}
