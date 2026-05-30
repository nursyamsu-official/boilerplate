import { prisma } from "@/lib/prisma";

import type { MenuPreviewItem } from "../types/menu.type";

export async function menuPreviewListRepository(): Promise<MenuPreviewItem[]> {
  return prisma.menu.findMany({
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
