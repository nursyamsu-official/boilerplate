import { prisma } from "@/lib/prisma";

import type { MenuParentOption } from "../types/menu.type";

export async function menuParentOptionsRepository(): Promise<MenuParentOption[]> {
  return prisma.menu.findMany({
    select: {
      id: true,
      code: true,
      label: true,
      parentId: true,
    },
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
  });
}
