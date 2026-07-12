import { prisma } from "@/lib/prisma";

import type { OrganizationalUnitPreviewItem } from "../types/organizational-unit.type";

export async function organizationalUnitPreviewListRepository(): Promise<
  OrganizationalUnitPreviewItem[]
> {
  const units = await prisma.organizationalUnit.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      parentId: true,
      sortOrder: true,
      isActive: true,
      companyId: true,
      company: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      { company: { name: "asc" } },
      { sortOrder: "asc" },
      { name: "asc" },
    ],
  });

  return units.map((unit) => ({
    id: unit.id,
    code: unit.code,
    name: unit.name,
    companyId: unit.companyId,
    companyName: unit.company.name,
    parentId: unit.parentId,
    sortOrder: unit.sortOrder,
    isActive: unit.isActive,
  }));
}
