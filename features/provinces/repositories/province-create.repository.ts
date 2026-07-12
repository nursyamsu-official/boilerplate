import { prisma } from "@/lib/prisma";

import type { ProvinceCreateInput } from "../schemas/province-create.schema";

export async function provinceCreateRepository(input: ProvinceCreateInput) {
  return prisma.province.create({
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

export async function provinceGetByCodeRepository(
  countryId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.province.findFirst({
    where: {
      countryId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function provinceGetByIdRepository(id: string) {
  return prisma.province.findUnique({
    where: { id },
    select: {
      id: true,
      countryId: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { districts: true } },
    },
  });
}

export async function provinceCountDistrictsRepository(id: string) {
  return prisma.district.count({
    where: { provinceId: id },
  });
}
