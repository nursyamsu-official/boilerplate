"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { CountryOption } from "@/features/countries";

import { provinceGetByIdAction } from "../actions/province-update.action";
import { buildProvinceListUrl } from "../lib/province-filter-url";
import { mapProvinceDetailToFormValues } from "../lib/province-form-defaults";
import type { ProvinceFilterInput } from "../schemas/province-filter.schema";
import type {
  ProvinceFormValues,
  ProvinceListResult,
  ProvinceTableRow,
} from "../types/province.type";
import { ProvinceTable } from "../table/ProvinceTable";
import { ProvinceCreateDialog } from "./ProvinceCreateDialog";
import { ProvinceEditDialog } from "./ProvinceEditDialog";

type ProvinceManagementProps = {
  initialData: ProvinceListResult;
  initialFilters: ProvinceFilterInput;
  countryOptions: CountryOption[];
};

type EditDialogState = {
  provinceId: string;
  defaultValues: ProvinceFormValues | null;
};

export function ProvinceManagement({
  initialData,
  initialFilters,
  countryOptions,
}: ProvinceManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<ProvinceFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildProvinceListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (province: ProvinceTableRow) => {
    setEditDialogState({
      provinceId: province.id,
      defaultValues: null,
    });

    try {
      const detail = await provinceGetByIdAction({ id: province.id });
      setEditDialogState({
        provinceId: province.id,
        defaultValues: mapProvinceDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load province");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Provinces</h2>
        <p className="text-sm text-muted-foreground">
          Manage provinces within each country.
        </p>
      </div>

      <ProvinceTable
        data={initialData}
        filters={initialFilters}
        countryOptions={countryOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <ProvinceCreateDialog
        open={isCreateOpen}
        countryOptions={countryOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <ProvinceEditDialog
        open={editDialogState !== null}
        provinceId={editDialogState?.provinceId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        countryOptions={countryOptions}
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
