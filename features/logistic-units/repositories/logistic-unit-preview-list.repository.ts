import { prisma } from "@/lib/prisma";

import type { LogisticUnitPreviewItem } from "../types/logistic-unit.type";

export async function logisticUnitPreviewListRepository(): Promise<
  LogisticUnitPreviewItem[]
> {
  const units = await prisma.logisticUnit.findMany({
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
