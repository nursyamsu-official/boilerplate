"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { buildLoginHistoryListUrl } from "../lib/login-history-filter-url";
import type { LoginHistoryFilterInput } from "../schemas/login-history-filter.schema";
import type {
  LoginHistoryListResult,
  LoginHistoryTableRow,
} from "../types/login-history.type";
import { LoginHistoryTable } from "../table/LoginHistoryTable";
import { LoginHistoryDetailDialog } from "./LoginHistoryDetailDialog";

type LoginHistoryManagementProps = {
  initialData: LoginHistoryListResult;
  initialFilters: LoginHistoryFilterInput;
};

export function LoginHistoryManagement({
  initialData,
  initialFilters,
}: LoginHistoryManagementProps) {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] =
    useState<LoginHistoryTableRow | null>(null);

  const handleFiltersChange = useCallback(
    (partial: Partial<LoginHistoryFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildLoginHistoryListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Login History</h2>
        <p className="text-sm text-muted-foreground">
          Review successful and failed sign-in attempts.
        </p>
      </div>

      <LoginHistoryTable
        data={initialData}
        filters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onRowClick={setSelectedRecord}
      />

      <LoginHistoryDetailDialog
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
