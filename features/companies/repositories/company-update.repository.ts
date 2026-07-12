import { prisma } from "@/lib/prisma";

import type { CompanyUpdateInput } from "../schemas/company-create.schema";

export async function companyUpdateRepository(input: CompanyUpdateInput) {
  return prisma.company.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function companyToggleStatusRepository(id: string) {
  const current = await prisma.company.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.company.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
