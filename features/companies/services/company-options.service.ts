import { prisma } from "@/lib/prisma";

import type { CompanyOption } from "../types/company.type";

export async function companyOptionsService(): Promise<CompanyOption[]> {
  return prisma.company.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
