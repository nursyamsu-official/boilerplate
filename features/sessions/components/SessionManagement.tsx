"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { buildSessionListUrl } from "../lib/session-filter-url";
import type { SessionFilterInput } from "../schemas/session-filter.schema";
import type { SessionListResult, SessionTableRow } from "../types/session.type";
import { SessionTable } from "../table/SessionTable";
import { SessionDetailDialog } from "./SessionDetailDialog";

type SessionManagementProps = {
  initialData: SessionListResult;
  initialFilters: SessionFilterInput;
};

export function SessionManagement({
  initialData,
  initialFilters,
}: SessionManagementProps) {
  const router = useRouter();
  const [selectedSession, setSelectedSession] =
    useState<SessionTableRow | null>(null);

  const handleFiltersChange = useCallback(
    (partial: Partial<SessionFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildSessionListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Sessions</h2>
        <p className="text-sm text-muted-foreground">
          View and revoke active user sessions across the platform.
        </p>
      </div>

      <SessionTable
        data={initialData}
        filters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onRowView={setSelectedSession}
        onRefresh={handleRefresh}
      />

      <SessionDetailDialog
        open={selectedSession !== null}
        session={selectedSession}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSession(null);
          }
        }}
      />
    </div>
  );
}
