import { prisma } from "@/lib/prisma";

import type {
  WebhookListFilters,
  WebhookListResult,
} from "../types/webhook.type";

export async function webhookListRepository(
  filters: WebhookListFilters,
): Promise<WebhookListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.status === "all"
      ? {}
      : { isActive: filters.status === "active" }),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { url: { contains: search, mode: "insensitive" as const } },
            { events: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.webhook.findMany({
      where,
      select: {
        id: true,
        name: true,
        url: true,
        events: true,
        isActive: true,
        failureCount: true,
        lastDeliveryStatus: true,
        lastDeliveryAt: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.webhook.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
