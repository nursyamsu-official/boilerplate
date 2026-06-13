import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  AuditLogManagement,
  auditLogGetListService,
  parseAuditLogFilter,
} from "@/features/audit-logs";

export const metadata: Metadata = {
  title: `Audit Logs | ${appConfig.appName}`,
  description: `Audit Logs | ${appConfig.description}`,
};

type AuditLogsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuditLogsPage({
  searchParams,
}: AuditLogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseAuditLogFilter(resolvedSearchParams);
  const initialData = await auditLogGetListService(filters);

  return (
    <AuditLogManagement initialData={initialData} initialFilters={filters} />
  );
}
