"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { CompanyOption } from "@/features/companies";

import { organizationalUnitGetByIdAction } from "../actions/organizational-unit-update.action";
import { organizationalUnitGetParentOptionsAction } from "../actions/organizational-unit-delete.action";
import { buildOrganizationalUnitListUrl } from "../lib/organizational-unit-filter-url";
import { mapOrganizationalUnitDetailToFormValues } from "../lib/organizational-unit-form-defaults";
import type { OrganizationalUnitFilterInput } from "../schemas/organizational-unit-filter.schema";
import type {
  OrganizationalUnitFormValues,
  OrganizationalUnitListResult,
  OrganizationalUnitParentOption,
  OrganizationalUnitTableRow,
} from "../types/organizational-unit.type";
import { OrganizationalUnitTable } from "@/features/organizational-units/table/OrganizationalUnitTable";
import { OrganizationalUnitCreateDialog } from "./OrganizationalUnitCreateDialog";
import { OrganizationalUnitEditDialog } from "./OrganizationalUnitEditDialog";

type OrganizationalUnitManagementProps = {
  initialData: OrganizationalUnitListResult;
  initialFilters: OrganizationalUnitFilterInput;
  companyOptions: CompanyOption[];
};

type EditDialogState = {
  unitId: string;
  defaultValues: OrganizationalUnitFormValues | null;
  parentOptions: OrganizationalUnitParentOption[];
};

export function OrganizationalUnitManagement({
  initialData,
  initialFilters,
  companyOptions,
}: OrganizationalUnitManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] =
    useState<EditDialogState | null>(null);
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<OrganizationalUnitFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildOrganizationalUnitListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (unit: OrganizationalUnitTableRow) => {
    setEditDialogState({
      unitId: unit.id,
      defaultValues: null,
      parentOptions: [],
    });

    try {
      const [unitDetail, parentOptions] = await Promise.all([
        organizationalUnitGetByIdAction({ id: unit.id }),
        organizationalUnitGetParentOptionsAction({
          companyId: unit.companyId,
          excludeUnitId: unit.id,
        }),
      ]);

      setEditDialogState({
        unitId: unit.id,
        defaultValues: mapOrganizationalUnitDetailToFormValues(unitDetail),
        parentOptions,
      });
    } catch {
      toast.error("Failed to load organizational unit");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Organizational Units</h2>
        <p className="text-sm text-muted-foreground">
          Manage organizational units and hierarchy within companies.
        </p>
      </div>

      <OrganizationalUnitTable
        data={initialData}
        filters={initialFilters}
        companyOptions={companyOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <OrganizationalUnitCreateDialog
        open={isCreateOpen}
        companyOptions={companyOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <OrganizationalUnitEditDialog
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
