import type { AuditAction } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type RecordAuditLogInput = {
  actorId?: string | null;
  action: AuditAction;
  entity: string;
  entityId?: string | null;
  summary?: string | null;
  oldValues?: unknown;
  newValues?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
};

function serializeAuditValue(value: unknown): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  return JSON.stringify(value);
}

export async function recordAuditLog(input: RecordAuditLogInput) {
  await prisma.auditLog.create({
    data: {
      actorId: input.actorId ?? null,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      summary: input.summary ?? null,
      oldValues: serializeAuditValue(input.oldValues),
      newValues: serializeAuditValue(input.newValues),
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    },
  });
}
