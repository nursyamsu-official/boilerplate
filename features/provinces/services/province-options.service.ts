import { prisma } from "@/lib/prisma";

import type { ProvinceOption } from "../types/province.type";

export async function provinceOptionsService(
  countryId?: string,
): Promise<ProvinceOption[]> {
  return prisma.province.findMany({
    where: {
      isActive: true,
      ...(countryId ? { countryId } : {}),
    },
    select: { id: true, code: true, name: true, countryId: true },
    orderBy: [{ name: "asc" }],
  });
}
