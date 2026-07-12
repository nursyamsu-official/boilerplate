import { prisma } from "@/lib/prisma";

import type { CompanyCreateInput } from "../schemas/company-create.schema";

export async function companyCreateRepository(input: CompanyCreateInput) {
  return prisma.company.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function companyGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.company.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function companyGetByIdRepository(id: string) {
  return prisma.company.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { organizationalUnits: true } },
    },
  });
}

export async function companyCountOrganizationalUnitsRepository(id: string) {
  return prisma.organizationalUnit.count({
    where: { companyId: id },
  });
}

export async function companyCountLogisticUnitsRepository(id: string) {
  return prisma.logisticUnit.count({
    where: { companyId: id },
  });
}
