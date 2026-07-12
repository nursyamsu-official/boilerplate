import { prisma } from "@/lib/prisma";

import type { UomOption } from "../types/uom.type";

export async function uomOptionsService(): Promise<UomOption[]> {
  return prisma.uom.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true, symbol: true },
    orderBy: [{ name: "asc" }],
  });
}
