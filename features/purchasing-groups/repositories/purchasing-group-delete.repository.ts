import { prisma } from "@/lib/prisma";

export async function purchasingGroupDeleteRepository(id: string) {
  return prisma.purchasingGroup.delete({
    where: { id },
    select: { id: true },
  });
}

export async function purchasingGroupCountChildrenRepository(id: string) {
  return prisma.purchasingGroup.count({
    where: { parentId: id },
  });
}
