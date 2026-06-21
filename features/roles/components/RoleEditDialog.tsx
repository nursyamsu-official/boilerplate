"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PermissionOptionGroup } from "@/features/permissions";

import { roleUpdateAction } from "../actions/role-update.action";
import { mapFormValuesToRoleUpdateInput } from "../lib/role-form-mapper";
import { roleFormFieldsSchema } from "../schemas/role-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: roleFormFieldsSchema,
              action: roleUpdateAction,
              mapInput: (values) =>
                mapFormValuesToRoleUpdateInput(roleId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: () => {
                onOpenChange(false);
                onSuccess();
              },
            }}
          />
        ) : (
          <FormDialogSkeleton fields={7} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
