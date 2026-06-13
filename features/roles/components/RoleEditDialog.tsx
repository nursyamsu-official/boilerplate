"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PermissionOptionGroup } from "@/features/permissions";

import { roleUpdateAction } from "../actions/role-update.action";
import { mapFormValuesToRoleUpdateInput } from "../lib/role-form-mapper";
import type { RoleFormValues } from "../types/role.type";
import { RoleForm } from "./RoleForm";

type RoleEditDialogProps = {
  open: boolean;
  roleId: string | null;
  defaultValues: RoleFormValues | null;
  permissionOptionGroups: PermissionOptionGroup[];
  isSystem?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function RoleEditDialog({
  open,
  roleId,
  defaultValues,
  permissionOptionGroups,
  isSystem = false,
  onOpenChange,
  onSuccess,
}: RoleEditDialogProps) {
  const handleSubmit = async (values: RoleFormValues) => {
    if (!roleId) return;

    await toast.promise(
      roleUpdateAction(mapFormValuesToRoleUpdateInput(roleId, values)).then(
        () => {
          onOpenChange(false);
          onSuccess();
        },
      ),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit role</DialogTitle>
          <DialogDescription>Update role details and permissions.</DialogDescription>
        </DialogHeader>

        {defaultValues && roleId ? (
          <RoleForm
            key={roleId}
            defaultValues={defaultValues}
            permissionOptionGroups={permissionOptionGroups}
            isSystem={isSystem}
            submitLabel="Update"
            pendingLabel="Updating..."
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Loading form...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
