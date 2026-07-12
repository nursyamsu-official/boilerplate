import { prisma } from "@/lib/prisma";

export async function purchasingGroupGetDescendantIdsRepository(
  unitId: string,
): Promise<string[]> {
  const descendants: string[] = [];
  let currentLevel = [unitId];

  while (currentLevel.length > 0) {
    const children = await prisma.purchasingGroup.findMany({
      where: { parentId: { in: currentLevel } },
      select: { id: true },
    });

    const childIds = children.map((child) => child.id);
    descendants.push(...childIds);
    currentLevel = childIds;
  }

  return descendants;
}
