import { prisma } from "@/lib/prisma";

import type { NavigationMenuItem } from "../types/navigation.type";

export async function userMenuListRepository(
  userId: string,
): Promise<NavigationMenuItem[]> {
  return prisma.menu.findMany({
    where: {
      isActive: true,
      roleMenus: {
        some: {
          canView: true,
          role: {
            isActive: true,
            userRoles: {
              some: {
                userId,
                OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
              },
            },
          },
        },
      },
    },
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
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
  });
}
