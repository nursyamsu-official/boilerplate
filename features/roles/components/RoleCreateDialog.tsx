"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PermissionOptionGroup } from "@/features/permissions";

import { roleCreateAction } from "../actions/role-create.action";
import { defaultRoleFormValues } from "../lib/role-form-defaults";
import { mapFormValuesToRoleCreateInput } from "../lib/role-form-mapper";
import { roleFormFieldsSchema } from "../schemas/role-create.schema";
import { RoleForm } from "./RoleForm";

type RoleCreateDialogProps = {
  open: boolean;
  permissionOptionGroups: PermissionOptionGroup[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function RoleCreateDialog({
  open,
  permissionOptionGroups,
  onOpenChange,
  onSuccess,
}: RoleCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create role</DialogTitle>
          <DialogDescription>
            Define a role and assign permissions.
          </DialogDescription>
        </DialogHeader>

        <RoleForm
          defaultValues={defaultRoleFormValues}
          permissionOptionGroups={permissionOptionGroups}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: roleFormFieldsSchema,
            action: roleCreateAction,
            mapInput: mapFormValuesToRoleCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: () => {
              onOpenChange(false);
              onSuccess();
            },
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
