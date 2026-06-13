import { auditLogListRepository } from "../repositories/audit-log-list.repository";
import type { AuditLogListFilters } from "../types/audit-log.type";

export async function auditLogGetListService(filters: AuditLogListFilters) {
  return auditLogListRepository(filters);
}
