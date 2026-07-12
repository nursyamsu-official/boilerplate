import { prisma } from "@/lib/prisma";

import type { CountryOption } from "../types/country.type";

export async function countryOptionsService(): Promise<CountryOption[]> {
  return prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
