import { prisma } from "@/lib/prisma";

import type {
  EmailLogListFilters,
  EmailLogListResult,
} from "../types/email-log.type";

export async function emailLogListRepository(
  filters: EmailLogListFilters,
): Promise<EmailLogListResult> {
  const search = filters.search.trim();
  const skip = (filters.page - 1) * filters.pageSize;

  const where = {
    ...(filters.status === "all" ? {} : { status: filters.status }),
    ...(search
      ? {
          OR: [
            { toEmail: { contains: search, mode: "insensitive" as const } },
            { subject: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.emailLog.findMany({
      where,
      select: {
        id: true,
        templateId: true,
        toEmail: true,
        ccEmail: true,
        bccEmail: true,
        subject: true,
        bodyHtml: true,
        status: true,
        error: true,
        attempts: true,
        sentAt: true,
        createdAt: true,
        template: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.emailLog.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
