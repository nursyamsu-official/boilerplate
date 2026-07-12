import { prisma } from "@/lib/prisma";

export async function logisticUnitDeleteRepository(id: string) {
  return prisma.logisticUnit.delete({
    where: { id },
    select: { id: true },
  });
}

export async function logisticUnitCountChildrenRepository(id: string) {
  return prisma.logisticUnit.count({
    where: { parentId: id },
  });
}
