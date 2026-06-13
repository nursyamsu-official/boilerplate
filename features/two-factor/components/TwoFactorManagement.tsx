"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { buildTwoFactorListUrl } from "../lib/two-factor-filter-url";
import type { TwoFactorFilterInput } from "../schemas/two-factor-filter.schema";
import type {
  TwoFactorListResult,
  TwoFactorTableRow,
} from "../types/two-factor.type";
import { TwoFactorTable } from "../table/TwoFactorTable";
import { TwoFactorDetailDialog } from "./TwoFactorDetailDialog";

type TwoFactorManagementProps = {
  initialData: TwoFactorListResult;
  initialFilters: TwoFactorFilterInput;
};

export function TwoFactorManagement({
  initialData,
  initialFilters,
}: TwoFactorManagementProps) {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] =
    useState<TwoFactorTableRow | null>(null);

  const handleFiltersChange = useCallback(
    (partial: Partial<TwoFactorFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildTwoFactorListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Two Factor</h2>
        <p className="text-sm text-muted-foreground">
          Review and manage two-factor authentication records.
        </p>
      </div>

      <TwoFactorTable
        data={initialData}
        filters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onRowView={setSelectedRecord}
        onRefresh={handleRefresh}
      />

      <TwoFactorDetailDialog
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
