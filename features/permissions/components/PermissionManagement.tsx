"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { PermissionModuleOption } from "@/features/permission-modules";

import { permissionGetByIdAction } from "../actions/permission-update.action";
import { buildPermissionListUrl } from "../lib/permission-filter-url";
import { mapPermissionDetailToFormValues } from "../lib/permission-form-defaults";
import type { PermissionFilterInput } from "../schemas/permission-filter.schema";
import type {
  PermissionFormValues,
  PermissionListResult,
  PermissionTableRow,
} from "../types/permission.type";
import { PermissionTable } from "../table/PermissionTable";
import { PermissionCreateDialog } from "./PermissionCreateDialog";
import { PermissionEditDialog } from "./PermissionEditDialog";

type PermissionManagementProps = {
  initialData: PermissionListResult;
  initialFilters: PermissionFilterInput;
  moduleOptions: PermissionModuleOption[];
};

type EditDialogState = {
  permissionId: string;
  defaultValues: PermissionFormValues | null;
  isSystem: boolean;
};

export function PermissionManagement({
  initialData,
  initialFilters,
  moduleOptions,
}: PermissionManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<PermissionFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildPermissionListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (permission: PermissionTableRow) => {
    setEditDialogState({
      permissionId: permission.id,
      defaultValues: null,
      isSystem: false,
    });

    try {
      const detail = await permissionGetByIdAction({ id: permission.id });
      setEditDialogState({
        permissionId: permission.id,
        defaultValues: mapPermissionDetailToFormValues(detail),
        isSystem: detail.isSystem,
      });
    } catch {
      toast.error("Failed to load permission");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Permissions</h2>
        <p className="text-sm text-muted-foreground">
          Manage permissions that can be assigned to roles.
        </p>
      </div>

      <PermissionTable
        data={initialData}
        filters={initialFilters}
        moduleOptions={moduleOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <PermissionCreateDialog
        open={isCreateOpen}
        moduleOptions={moduleOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <PermissionEditDialog
        open={editDialogState !== null}
        permissionId={editDialogState?.permissionId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        moduleOptions={moduleOptions}
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
