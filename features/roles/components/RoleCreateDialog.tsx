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

import { roleCreateAction } from "../actions/role-create.action";
import { defaultRoleFormValues } from "../lib/role-form-defaults";
import { mapFormValuesToRoleCreateInput } from "../lib/role-form-mapper";
import type { RoleFormValues } from "../types/role.type";
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
  const handleSubmit = async (values: RoleFormValues) => {
    await toast.promise(
      roleCreateAction(mapFormValuesToRoleCreateInput(values)).then(() => {
        onOpenChange(false);
        onSuccess();
      }),
      {
        loading: "Creating...",
        success: "Created successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
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
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
