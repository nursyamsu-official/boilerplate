import { prisma } from "@/lib/prisma";

import type { DistrictUpdateInput } from "../schemas/district-create.schema";

export async function districtUpdateRepository(input: DistrictUpdateInput) {
  return prisma.district.update({
    where: { id: input.id },
    data: {
      provinceId: input.provinceId,
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function districtToggleStatusRepository(id: string) {
  const current = await prisma.district.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.district.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
