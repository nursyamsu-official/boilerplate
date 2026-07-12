import { prisma } from "@/lib/prisma";

import type { OrganizationalUnitParentOption } from "../types/organizational-unit.type";

export async function organizationalUnitParentOptionsRepository(
  companyId: string,
): Promise<OrganizationalUnitParentOption[]> {
  return prisma.organizationalUnit.findMany({
    where: { companyId },
    select: {
      id: true,
      code: true,
      name: true,
      parentId: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}
