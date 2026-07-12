import { prisma } from "@/lib/prisma";

import type { DistrictCreateInput } from "../schemas/district-create.schema";

export async function districtCreateRepository(input: DistrictCreateInput) {
  return prisma.district.create({
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

export async function districtGetByCodeRepository(
  provinceId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.district.findFirst({
    where: {
      provinceId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function districtGetByIdRepository(id: string) {
  return prisma.district.findUnique({
    where: { id },
    select: {
      id: true,
      provinceId: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      province: { select: { countryId: true } },
    },
  });
}
