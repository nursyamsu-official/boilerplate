"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { UomOption } from "@/features/uoms";

import { uomGlobalConversionGetByIdAction } from "../actions/uom-global-conversion-update.action";
import { buildUomGlobalConversionListUrl } from "../lib/uom-global-conversion-filter-url";
import { mapUomGlobalConversionDetailToFormValues } from "../lib/uom-global-conversion-form-defaults";
import type { UomGlobalConversionFilterInput } from "../schemas/uom-global-conversion-filter.schema";
import type {
  UomGlobalConversionFormValues,
  UomGlobalConversionListResult,
  UomGlobalConversionTableRow,
} from "../types/uom-global-conversion.type";
import { UomGlobalConversionTable } from "../table/UomGlobalConversionTable";
import { UomGlobalConversionCreateDialog } from "./UomGlobalConversionCreateDialog";
import { UomGlobalConversionEditDialog } from "./UomGlobalConversionEditDialog";

type UomGlobalConversionManagementProps = {
  initialData: UomGlobalConversionListResult;
  initialFilters: UomGlobalConversionFilterInput;
  uomOptions: UomOption[];
};

type EditDialogState = {
  conversionId: string;
  defaultValues: UomGlobalConversionFormValues | null;
};

export function UomGlobalConversionManagement({
  initialData,
  initialFilters,
  uomOptions,
}: UomGlobalConversionManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] =
    useState<EditDialogState | null>(null);
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<UomGlobalConversionFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildUomGlobalConversionListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (conversion: UomGlobalConversionTableRow) => {
    setEditDialogState({
      conversionId: conversion.id,
      defaultValues: null,
    });

    try {
      const detail = await uomGlobalConversionGetByIdAction({ id: conversion.id });
      setEditDialogState({
        conversionId: conversion.id,
        defaultValues: mapUomGlobalConversionDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load conversion");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">UOM Global Conversions</h2>
        <p className="text-sm text-muted-foreground">
          Manage global conversion factors between units of measure.
        </p>
      </div>

      <UomGlobalConversionTable
        data={initialData}
        filters={initialFilters}
        uomOptions={uomOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <UomGlobalConversionCreateDialog
        open={isCreateOpen}
        uomOptions={uomOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <UomGlobalConversionEditDialog
        open={editDialogState !== null}
        conversionId={editDialogState?.conversionId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        uomOptions={uomOptions}
        onOpenChange={(open) => {
          if (!open) setEditDialogState(null);
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
