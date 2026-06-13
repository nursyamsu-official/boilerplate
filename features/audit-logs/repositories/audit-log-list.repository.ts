import { prisma } from "@/lib/prisma";

import type {
  AuditLogListFilters,
  AuditLogListResult,
} from "../types/audit-log.type";

export async function auditLogListRepository(
  filters: AuditLogListFilters,
): Promise<AuditLogListResult> {
  const search = filters.search.trim();
  const entity = filters.entity.trim();
  const skip = (filters.page - 1) * filters.pageSize;

  const where = {
    ...(filters.action === "all" ? {} : { action: filters.action }),
    ...(entity
      ? { entity: { contains: entity, mode: "insensitive" as const } }
      : {}),
    ...(search
      ? {
          OR: [
            { summary: { contains: search, mode: "insensitive" as const } },
            { entity: { contains: search, mode: "insensitive" as const } },
            { entityId: { contains: search, mode: "insensitive" as const } },
            {
              actor: {
                OR: [
                  { email: { contains: search, mode: "insensitive" as const } },
                  { name: { contains: search, mode: "insensitive" as const } },
                ],
              },
            },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      select: {
        id: true,
        actorId: true,
        action: true,
        entity: true,
        entityId: true,
        summary: true,
        oldValues: true,
        newValues: true,
        ipAddress: true,
        userAgent: true,
        createdAt: true,
        actor: {
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
    prisma.auditLog.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
