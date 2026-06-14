import { prisma } from "@/lib/prisma";

import type {
  EmailTemplateListFilters,
  EmailTemplateListResult,
} from "../types/email-template.type";

export async function emailTemplateListRepository(
  filters: EmailTemplateListFilters,
): Promise<EmailTemplateListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(search
      ? {
          OR: [
            { code: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
            { subject: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.emailTemplate.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        subject: true,
        isActive: true,
        isSystem: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.emailTemplate.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
