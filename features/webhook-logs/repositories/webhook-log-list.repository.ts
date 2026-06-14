import { prisma } from "@/lib/prisma";

import type {
  WebhookLogListFilters,
  WebhookLogListResult,
} from "../types/webhook-log.type";

export async function webhookLogListRepository(
  filters: WebhookLogListFilters,
): Promise<WebhookLogListResult> {
  const search = filters.search.trim();
  const skip = (filters.page - 1) * filters.pageSize;

  const where = {
    ...(filters.status === "all" ? {} : { status: filters.status }),
    ...(filters.webhookId === "all" ? {} : { webhookId: filters.webhookId }),
    ...(search
      ? {
          OR: [
            { event: { contains: search, mode: "insensitive" as const } },
            { error: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.webhookLog.findMany({
      where,
      select: {
        id: true,
        webhookId: true,
        event: true,
        payload: true,
        requestHeaders: true,
        responseStatus: true,
        responseBody: true,
        status: true,
        attempts: true,
        error: true,
        nextRetryAt: true,
        deliveredAt: true,
        createdAt: true,
        webhook: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.webhookLog.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
