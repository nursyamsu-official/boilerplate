"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { buildAuditLogListUrl } from "../lib/audit-log-filter-url";
import type { AuditLogFilterInput } from "../schemas/audit-log-filter.schema";
import type {
  AuditLogListResult,
  AuditLogTableRow,
} from "../types/audit-log.type";
import { AuditLogTable } from "../table/AuditLogTable";
import { AuditLogDetailDialog } from "./AuditLogDetailDialog";

type AuditLogManagementProps = {
  initialData: AuditLogListResult;
  initialFilters: AuditLogFilterInput;
};

export function AuditLogManagement({
  initialData,
  initialFilters,
}: AuditLogManagementProps) {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] =
    useState<AuditLogTableRow | null>(null);

  const handleFiltersChange = useCallback(
    (partial: Partial<AuditLogFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildAuditLogListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Audit Logs</h2>
        <p className="text-sm text-muted-foreground">
          Review recorded security and administrative activity.
        </p>
      </div>

      <AuditLogTable
        data={initialData}
        filters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onRowClick={setSelectedRecord}
      />

      <AuditLogDetailDialog
        open={selectedRecord !== null}
        record={selectedRecord}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRecord(null);
          }
        }}
      />
    </div>
  );
}
