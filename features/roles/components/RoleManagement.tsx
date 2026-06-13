"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { PermissionOptionGroup } from "@/features/permissions";

import { roleGetByIdAction } from "../actions/role-update.action";
import { buildRoleListUrl } from "../lib/role-filter-url";
import { mapRoleDetailToFormValues } from "../lib/role-form-defaults";
import type { RoleFilterInput } from "../schemas/role-filter.schema";
import type {
  RoleFormValues,
  RoleListResult,
  RoleTableRow,
} from "../types/role.type";
import { RoleTable } from "../table/RoleTable";
import { RoleCreateDialog } from "./RoleCreateDialog";
import { RoleEditDialog } from "./RoleEditDialog";

type RoleManagementProps = {
  initialData: RoleListResult;
  initialFilters: RoleFilterInput;
  permissionOptionGroups: PermissionOptionGroup[];
};

type EditDialogState = {
  roleId: string;
  defaultValues: RoleFormValues;
  isSystem: boolean;
};

export function RoleManagement({
  initialData,
  initialFilters,
  permissionOptionGroups,
}: RoleManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleFiltersChange = useCallback(
    (partial: Partial<RoleFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildRoleListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (role: RoleTableRow) => {
    setIsEditLoading(true);

    try {
      const detail = await roleGetByIdAction({ id: role.id });
      setEditDialogState({
        roleId: role.id,
        defaultValues: mapRoleDetailToFormValues(detail),
        isSystem: detail.isSystem,
      });
    } catch {
      toast.error("Failed to load role");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Roles</h2>
        <p className="text-sm text-muted-foreground">
          Manage user roles and their permissions.
        </p>
      </div>

      <RoleTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <RoleCreateDialog
        open={isCreateOpen}
        permissionOptionGroups={permissionOptionGroups}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <RoleEditDialog
        open={editDialogState !== null}
        roleId={editDialogState?.roleId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        permissionOptionGroups={permissionOptionGroups}
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
