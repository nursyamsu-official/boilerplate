import { prisma } from "@/lib/prisma";

import type { DocumentTypeOption } from "../types/document-type.type";

export async function documentTypeOptionsService(
  categoryId?: string,
): Promise<DocumentTypeOption[]> {
  return prisma.documentType.findMany({
    where: {
      isActive: true,
      ...(categoryId ? { categoryId } : {}),
    },
    select: { id: true, code: true, name: true, categoryId: true },
    orderBy: [{ name: "asc" }],
  });
}
