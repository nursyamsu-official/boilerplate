import { prisma } from "@/lib/prisma";

import type { RoleOption } from "../types/role.type";

export async function roleOptionsService(): Promise<RoleOption[]> {
  return prisma.role.findMany({
    where: { isActive: true },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });
}
