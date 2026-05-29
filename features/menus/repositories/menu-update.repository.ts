import { prisma } from "@/lib/prisma";

import type { MenuUpdateInput } from "../schemas/menu-update.schema";

export async function menuUpdateRepository(input: MenuUpdateInput) {
  return prisma.menu.update({
    where: { id: input.id },
    data: {
      code: input.code,
      label: input.label,
      path: input.path,
      icon: input.icon,
      parentId: input.parentId,
      sortOrder: input.sortOrder,
      isActive: input.isActive,
    },
    select: {
      id: true,
      code: true,
      label: true,
    },
  });
}

export async function menuToggleStatusRepository(id: string, isActive: boolean) {
  return prisma.menu.update({
    where: { id },
    data: { isActive },
    select: { id: true, isActive: true },
  });
}
