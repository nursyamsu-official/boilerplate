import { prisma } from "@/lib/prisma";

import type { OrganizationalUnitUpdateInput } from "../schemas/organizational-unit-create.schema";

export async function organizationalUnitUpdateRepository(
  input: OrganizationalUnitUpdateInput,
) {
  return prisma.organizationalUnit.update({
    where: { id: input.id },
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

export async function organizationalUnitToggleStatusRepository(
  id: string,
  isActive: boolean,
) {
  return prisma.organizationalUnit.update({
    where: { id },
    data: { isActive },
    select: { id: true, isActive: true },
  });
}
