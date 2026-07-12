import { prisma } from "@/lib/prisma";

import type { OrganizationalUnitCreateInput } from "../schemas/organizational-unit-create.schema";
import type { OrganizationalUnitDetail } from "../types/organizational-unit.type";

export async function organizationalUnitCreateRepository(
  input: OrganizationalUnitCreateInput,
) {
  return prisma.organizationalUnit.create({
    data: {
      companyId: input.companyId,
      code: input.code,
      name: input.name,
      description: input.description,
      parentId: input.parentId,
      sortOrder: input.sortOrder,
      isActive: input.isActive,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}

export async function organizationalUnitGetByIdRepository(
  id: string,
): Promise<OrganizationalUnitDetail | null> {
  return prisma.organizationalUnit.findUnique({
    where: { id },
    select: {
      id: true,
      companyId: true,
      code: true,
      name: true,
      description: true,
      parentId: true,
      sortOrder: true,
      isActive: true,
    },
  });
}

export async function organizationalUnitGetByCodeRepository(
  companyId: string,
  code: string,
  excludeId?: string,
): Promise<{ id: string } | null> {
  return prisma.organizationalUnit.findFirst({
    where: {
      companyId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}
