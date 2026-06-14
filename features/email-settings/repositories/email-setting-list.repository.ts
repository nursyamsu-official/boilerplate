import { prisma } from "@/lib/prisma";

import type {
  EmailSettingListFilters,
  EmailSettingListResult,
} from "../types/email-setting.type";

export async function emailSettingListRepository(
  filters: EmailSettingListFilters,
): Promise<EmailSettingListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.provider === "all" ? {} : { provider: filters.provider }),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { fromEmail: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.emailSetting.findMany({
      where,
      select: {
        id: true,
        name: true,
        provider: true,
        fromEmail: true,
        fromName: true,
        isActive: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.emailSetting.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
