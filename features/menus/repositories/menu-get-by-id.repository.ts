import { prisma } from "@/lib/prisma";

import type { MenuDetail } from "../types/menu.type";

export async function menuGetByIdRepository(
  id: string,
): Promise<MenuDetail | null> {
  return prisma.menu.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      label: true,
      path: true,
      icon: true,
      parentId: true,
      sortOrder: true,
      isActive: true,
    },
  });
}

export async function menuGetByCodeRepository(
  code: string,
  excludeId?: string,
): Promise<{ id: string } | null> {
  return prisma.menu.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function menuGetDescendantIdsRepository(
  menuId: string,
): Promise<string[]> {
  const descendants: string[] = [];
  let currentLevel = [menuId];

  while (currentLevel.length > 0) {
    const children = await prisma.menu.findMany({
      where: { parentId: { in: currentLevel } },
      select: { id: true },
    });

    const childIds = children.map((child) => child.id);
    descendants.push(...childIds);
    currentLevel = childIds;
  }

  return descendants;
}
