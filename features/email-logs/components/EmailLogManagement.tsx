"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { buildEmailLogListUrl } from "../lib/email-log-filter-url";
import type { EmailLogFilterInput } from "../schemas/email-log-filter.schema";
import type {
  EmailLogListResult,
  EmailLogTableRow,
} from "../types/email-log.type";
import { EmailLogTable } from "../table/EmailLogTable";
import { EmailLogDetailDialog } from "./EmailLogDetailDialog";

type EmailLogManagementProps = {
  initialData: EmailLogListResult;
  initialFilters: EmailLogFilterInput;
};

export function EmailLogManagement({
  initialData,
  initialFilters,
}: EmailLogManagementProps) {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] =
    useState<EmailLogTableRow | null>(null);

  const handleFiltersChange = useCallback(
    (partial: Partial<EmailLogFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEmailLogListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Email Logs</h2>
        <p className="text-sm text-muted-foreground">
          Review outbound email delivery history and failures.
        </p>
      </div>

      <EmailLogTable
        data={initialData}
        filters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onRowClick={setSelectedRecord}
      />

      <EmailLogDetailDialog
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
