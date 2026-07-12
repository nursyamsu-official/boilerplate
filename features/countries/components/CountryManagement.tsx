"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { countryGetByIdAction } from "../actions/country-update.action";
import { buildCountryListUrl } from "../lib/country-filter-url";
import { mapCountryDetailToFormValues } from "../lib/country-form-defaults";
import type { CountryFilterInput } from "../schemas/country-filter.schema";
import type {
  CountryFormValues,
  CountryListResult,
  CountryTableRow,
} from "../types/country.type";
import { CountryTable } from "../table/CountryTable";
import { CountryCreateDialog } from "./CountryCreateDialog";
import { CountryEditDialog } from "./CountryEditDialog";

type CountryManagementProps = {
  initialData: CountryListResult;
  initialFilters: CountryFilterInput;
};

type EditDialogState = {
  countryId: string;
  defaultValues: CountryFormValues | null;
};

export function CountryManagement({
  initialData,
  initialFilters,
}: CountryManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<CountryFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildCountryListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (country: CountryTableRow) => {
    setEditDialogState({
      countryId: country.id,
      defaultValues: null,
    });

    try {
      const detail = await countryGetByIdAction({ id: country.id });
      setEditDialogState({
        countryId: country.id,
        defaultValues: mapCountryDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load country");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Countries</h2>
        <p className="text-sm text-muted-foreground">
          Manage countries in the address hierarchy.
        </p>
      </div>

      <CountryTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <CountryCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <CountryEditDialog
        open={editDialogState !== null}
        countryId={editDialogState?.countryId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
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
