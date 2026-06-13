"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { permissionModuleUpdateAction } from "../actions/permission-module-update.action";
import { mapFormValuesToPermissionModuleUpdateInput } from "../lib/permission-module-form-mapper";
import type { PermissionModuleFormValues } from "../types/permission-module.type";
import { PermissionModuleForm } from "./PermissionModuleForm";

type PermissionModuleEditDialogProps = {
  open: boolean;
  moduleId: string | null;
  defaultValues: PermissionModuleFormValues | null;
  isSystem?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function PermissionModuleEditDialog({
  open,
  moduleId,
  defaultValues,
  isSystem = false,
  onOpenChange,
  onSuccess,
}: PermissionModuleEditDialogProps) {
  const handleSubmit = async (values: PermissionModuleFormValues) => {
    if (!moduleId) return;

    await toast.promise(
      permissionModuleUpdateAction(
        mapFormValuesToPermissionModuleUpdateInput(moduleId, values),
      ).then(() => {
        onOpenChange(false);
        onSuccess();
      }),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit permission module</DialogTitle>
          <DialogDescription>Update module details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && moduleId ? (
          <PermissionModuleForm
            key={moduleId}
            defaultValues={defaultValues}
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
