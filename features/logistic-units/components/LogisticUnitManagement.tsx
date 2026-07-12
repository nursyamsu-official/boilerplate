"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { CompanyOption } from "@/features/companies";

import { logisticUnitGetByIdAction } from "../actions/logistic-unit-update.action";
import { logisticUnitGetParentOptionsAction } from "../actions/logistic-unit-delete.action";
import { buildLogisticUnitListUrl } from "../lib/logistic-unit-filter-url";
import { mapLogisticUnitDetailToFormValues } from "../lib/logistic-unit-form-defaults";
import type { LogisticUnitFilterInput } from "../schemas/logistic-unit-filter.schema";
import type {
  LogisticUnitFormValues,
  LogisticUnitListResult,
  LogisticUnitParentOption,
  LogisticUnitPreviewItem,
  LogisticUnitTableRow,
} from "../types/logistic-unit.type";
import { LogisticUnitTable } from "@/features/logistic-units/table/LogisticUnitTable";
import { LogisticUnitCreateDialog } from "./LogisticUnitCreateDialog";
import { LogisticUnitEditDialog } from "./LogisticUnitEditDialog";
import { LogisticUnitPreviewDialog } from "./LogisticUnitPreviewDialog";

type LogisticUnitManagementProps = {
  initialData: LogisticUnitListResult;
  initialFilters: LogisticUnitFilterInput;
  companyOptions: CompanyOption[];
  previewItems: LogisticUnitPreviewItem[];
};

type EditDialogState = {
  unitId: string;
  defaultValues: LogisticUnitFormValues | null;
  parentOptions: LogisticUnitParentOption[];
};

export function LogisticUnitManagement({
  initialData,
  initialFilters,
  companyOptions,
  previewItems,
}: LogisticUnitManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editDialogState, setEditDialogState] =
    useState<EditDialogState | null>(null);
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<LogisticUnitFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildLogisticUnitListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (unit: LogisticUnitTableRow) => {
    setEditDialogState({
      unitId: unit.id,
      defaultValues: null,
      parentOptions: [],
    });

    try {
      const [unitDetail, parentOptions] = await Promise.all([
        logisticUnitGetByIdAction({ id: unit.id }),
        logisticUnitGetParentOptionsAction({
          companyId: unit.companyId,
          excludeUnitId: unit.id,
        }),
      ]);

      setEditDialogState({
        unitId: unit.id,
        defaultValues: mapLogisticUnitDetailToFormValues(unitDetail),
        parentOptions,
      });
    } catch {
      toast.error("Failed to load logistic unit");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Logistic Units</h2>
        <p className="text-sm text-muted-foreground">
          Manage Logistic Units and hierarchy within companies.
        </p>
      </div>

      <LogisticUnitTable
        data={initialData}
        filters={initialFilters}
        companyOptions={companyOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onPreview={() => setIsPreviewOpen(true)}
        onRefresh={handleRefresh}
      />

      <LogisticUnitPreviewDialog
        open={isPreviewOpen}
        items={previewItems}
        onOpenChange={setIsPreviewOpen}
      />

      <LogisticUnitCreateDialog
        open={isCreateOpen}
        companyOptions={companyOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <LogisticUnitEditDialog
        open={editDialogState !== null}
        unitId={editDialogState?.unitId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        companyOptions={companyOptions}
        parentOptions={editDialogState?.parentOptions ?? []}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogState(null);
          }
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
