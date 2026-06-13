import type { AuditAction } from "@/generated/prisma/client";

import type { AuditLogFilterInput } from "../schemas/audit-log-filter.schema";

export type AuditLogActorSummary = {
  id: string;
  name: string;
  email: string;
};

export type AuditLogTableRow = {
  id: string;
  actorId: string | null;
  action: AuditAction;
  entity: string;
  entityId: string | null;
  summary: string | null;
  oldValues: string | null;
  newValues: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  actor: AuditLogActorSummary | null;
};

export type AuditLogListResult = {
  items: AuditLogTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type AuditLogListFilters = AuditLogFilterInput;
