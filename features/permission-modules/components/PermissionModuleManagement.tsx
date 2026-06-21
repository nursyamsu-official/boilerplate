"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { permissionModuleGetByIdAction } from "../actions/permission-module-update.action";
import { buildPermissionModuleListUrl } from "../lib/permission-module-filter-url";
import { mapPermissionModuleDetailToFormValues } from "../lib/permission-module-form-defaults";
import type { PermissionModuleFilterInput } from "../schemas/permission-module-filter.schema";
import type {
  PermissionModuleFormValues,
  PermissionModuleListResult,
  PermissionModuleTableRow,
} from "../types/permission-module.type";
import { PermissionModuleTable } from "../table/PermissionModuleTable";
import { PermissionModuleCreateDialog } from "./PermissionModuleCreateDialog";
import { PermissionModuleEditDialog } from "./PermissionModuleEditDialog";

type PermissionModuleManagementProps = {
  initialData: PermissionModuleListResult;
  initialFilters: PermissionModuleFilterInput;
};

type EditDialogState = {
  moduleId: string;
  defaultValues: PermissionModuleFormValues | null;
  isSystem: boolean;
};

export function PermissionModuleManagement({
  initialData,
  initialFilters,
}: PermissionModuleManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<PermissionModuleFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildPermissionModuleListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (module: PermissionModuleTableRow) => {
    setEditDialogState({
      moduleId: module.id,
      defaultValues: null,
      isSystem: false,
    });

    try {
      const detail = await permissionModuleGetByIdAction({ id: module.id });
      setEditDialogState({
        moduleId: module.id,
        defaultValues: mapPermissionModuleDetailToFormValues(detail),
        isSystem: detail.isSystem,
      });
    } catch {
      toast.error("Failed to load module");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Permission Modules</h2>
        <p className="text-sm text-muted-foreground">
          Organize permissions into logical groups.
        </p>
      </div>

      <PermissionModuleTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <PermissionModuleCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <PermissionModuleEditDialog
        open={editDialogState !== null}
        moduleId={editDialogState?.moduleId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        isSystem={editDialogState?.isSystem ?? false}
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
