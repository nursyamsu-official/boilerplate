import { prisma } from "@/lib/prisma";

import type { CountryUpdateInput } from "../schemas/country-create.schema";

export async function countryUpdateRepository(input: CountryUpdateInput) {
  return prisma.country.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function countryToggleStatusRepository(id: string) {
  const current = await prisma.country.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.country.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
