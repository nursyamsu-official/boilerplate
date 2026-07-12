import { prisma } from "@/lib/prisma";

export async function organizationalUnitDeleteRepository(id: string) {
  return prisma.organizationalUnit.delete({
    where: { id },
    select: { id: true },
  });
}

export async function organizationalUnitCountChildrenRepository(id: string) {
  return prisma.organizationalUnit.count({
    where: { parentId: id },
  });
}
