"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { CountryOption } from "@/features/countries";
import type { ProvinceOption } from "@/features/provinces";

import { districtGetByIdAction } from "../actions/district-update.action";
import { buildDistrictListUrl } from "../lib/district-filter-url";
import { mapDistrictDetailToFormValues } from "../lib/district-form-defaults";
import type { DistrictFilterInput } from "../schemas/district-filter.schema";
import type {
  DistrictFormValues,
  DistrictListResult,
  DistrictTableRow,
} from "../types/district.type";
import { DistrictTable } from "../table/DistrictTable";
import { DistrictCreateDialog } from "./DistrictCreateDialog";
import { DistrictEditDialog } from "./DistrictEditDialog";

type DistrictManagementProps = {
  initialData: DistrictListResult;
  initialFilters: DistrictFilterInput;
  countryOptions: CountryOption[];
  provinceOptions: ProvinceOption[];
};

type EditDialogState = {
  districtId: string;
  defaultValues: DistrictFormValues | null;
};

export function DistrictManagement({
  initialData,
  initialFilters,
  countryOptions,
  provinceOptions,
}: DistrictManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<DistrictFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildDistrictListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (district: DistrictTableRow) => {
    setEditDialogState({
      districtId: district.id,
      defaultValues: null,
    });

    try {
      const detail = await districtGetByIdAction({ id: district.id });
      setEditDialogState({
        districtId: district.id,
        defaultValues: mapDistrictDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load district");
      setEditDialogState(null);
    }
  }, []);

  const editProvinceOptions = editDialogState?.defaultValues
    ? provinceOptions.filter(
        (option) => option.countryId === editDialogState.defaultValues?.countryId,
      )
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Districts</h2>
        <p className="text-sm text-muted-foreground">
          Manage districts within each province.
        </p>
      </div>

      <DistrictTable
        data={initialData}
        filters={initialFilters}
        countryOptions={countryOptions}
        provinceOptions={provinceOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <DistrictCreateDialog
        open={isCreateOpen}
        countryOptions={countryOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <DistrictEditDialog
        open={editDialogState !== null}
        districtId={editDialogState?.districtId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        countryOptions={countryOptions}
        initialProvinceOptions={editProvinceOptions}
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
