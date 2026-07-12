import { prisma } from "@/lib/prisma";

import type { DocumentCategoryOption } from "../types/document-category.type";

export async function documentCategoryOptionsService(): Promise<DocumentCategoryOption[]> {
  return prisma.documentCategory.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
