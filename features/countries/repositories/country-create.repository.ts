import { prisma } from "@/lib/prisma";

import type { CountryCreateInput } from "../schemas/country-create.schema";

export async function countryCreateRepository(input: CountryCreateInput) {
  return prisma.country.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function countryGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.country.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function countryGetByIdRepository(id: string) {
  return prisma.country.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { provinces: true } },
    },
  });
}

export async function countryCountProvincesRepository(id: string) {
  return prisma.province.count({
    where: { countryId: id },
  });
}
