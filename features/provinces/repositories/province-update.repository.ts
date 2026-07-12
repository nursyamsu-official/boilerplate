import { prisma } from "@/lib/prisma";

import type { ProvinceUpdateInput } from "../schemas/province-create.schema";

export async function provinceUpdateRepository(input: ProvinceUpdateInput) {
  return prisma.province.update({
    where: { id: input.id },
    data: {
      countryId: input.countryId,
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function provinceToggleStatusRepository(id: string) {
  const current = await prisma.province.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.province.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
