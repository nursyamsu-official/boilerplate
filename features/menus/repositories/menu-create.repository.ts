import { prisma } from "@/lib/prisma";

import type { MenuCreateInput } from "../schemas/menu-create.schema";

export async function menuCreateRepository(input: MenuCreateInput) {
  return prisma.menu.create({
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
