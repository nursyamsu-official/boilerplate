"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { uomGetByIdAction } from "../actions/uom-update.action";
import { buildUomListUrl } from "../lib/uom-filter-url";
import { mapUomDetailToFormValues } from "../lib/uom-form-defaults";
import type { UomFilterInput } from "../schemas/uom-filter.schema";
import type {
  UomFormValues,
  UomListResult,
  UomTableRow,
} from "../types/uom.type";
import { UomTable } from "../table/UomTable";
import { UomCreateDialog } from "./UomCreateDialog";
import { UomEditDialog } from "./UomEditDialog";

type UomManagementProps = {
  initialData: UomListResult;
  initialFilters: UomFilterInput;
};

type EditDialogState = {
  uomId: string;
  defaultValues: UomFormValues | null;
};

export function UomManagement({
  initialData,
  initialFilters,
}: UomManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<UomFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildUomListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (uom: UomTableRow) => {
    setEditDialogState({
      uomId: uom.id,
      defaultValues: null,
    });

    try {
      const detail = await uomGetByIdAction({ id: uom.id });
      setEditDialogState({
        uomId: uom.id,
        defaultValues: mapUomDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load UOM");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">UOMs</h2>
        <p className="text-sm text-muted-foreground">
          Manage units of measure used across the application.
        </p>
      </div>

      <UomTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <UomCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <UomEditDialog
        open={editDialogState !== null}
        uomId={editDialogState?.uomId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        onOpenChange={(open) => {
          if (!open) setEditDialogState(null);
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
