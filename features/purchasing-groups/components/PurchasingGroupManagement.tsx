"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { CompanyOption } from "@/features/companies";

import { purchasingGroupGetByIdAction } from "../actions/purchasing-group-update.action";
import { purchasingGroupGetParentOptionsAction } from "../actions/purchasing-group-delete.action";
import { buildPurchasingGroupListUrl } from "../lib/purchasing-group-filter-url";
import { mapPurchasingGroupDetailToFormValues } from "../lib/purchasing-group-form-defaults";
import type { PurchasingGroupFilterInput } from "../schemas/purchasing-group-filter.schema";
import type {
  PurchasingGroupFormValues,
  PurchasingGroupListResult,
  PurchasingGroupParentOption,
  PurchasingGroupPreviewItem,
  PurchasingGroupTableRow,
} from "../types/purchasing-group.type";
import { PurchasingGroupTable } from "@/features/purchasing-groups/table/PurchasingGroupTable";
import { PurchasingGroupCreateDialog } from "./PurchasingGroupCreateDialog";
import { PurchasingGroupEditDialog } from "./PurchasingGroupEditDialog";
import { PurchasingGroupPreviewDialog } from "./PurchasingGroupPreviewDialog";

type PurchasingGroupManagementProps = {
  initialData: PurchasingGroupListResult;
  initialFilters: PurchasingGroupFilterInput;
  companyOptions: CompanyOption[];
  previewItems: PurchasingGroupPreviewItem[];
};

type EditDialogState = {
  unitId: string;
  defaultValues: PurchasingGroupFormValues | null;
  parentOptions: PurchasingGroupParentOption[];
};

export function PurchasingGroupManagement({
  initialData,
  initialFilters,
  companyOptions,
  previewItems,
}: PurchasingGroupManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editDialogState, setEditDialogState] =
    useState<EditDialogState | null>(null);
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<PurchasingGroupFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildPurchasingGroupListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (unit: PurchasingGroupTableRow) => {
    setEditDialogState({
      unitId: unit.id,
      defaultValues: null,
      parentOptions: [],
    });

    try {
      const [unitDetail, parentOptions] = await Promise.all([
        purchasingGroupGetByIdAction({ id: unit.id }),
        purchasingGroupGetParentOptionsAction({
          companyId: unit.companyId,
          excludeUnitId: unit.id,
        }),
      ]);

      setEditDialogState({
        unitId: unit.id,
        defaultValues: mapPurchasingGroupDetailToFormValues(unitDetail),
        parentOptions,
      });
    } catch {
      toast.error("Failed to load purchasing group");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Purchasing Groups</h2>
        <p className="text-sm text-muted-foreground">
          Manage Purchasing Groups and hierarchy within companies.
        </p>
      </div>

      <PurchasingGroupTable
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

      <PurchasingGroupPreviewDialog
        open={isPreviewOpen}
        items={previewItems}
        onOpenChange={setIsPreviewOpen}
      />

      <PurchasingGroupCreateDialog
        open={isCreateOpen}
        companyOptions={companyOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <PurchasingGroupEditDialog
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
