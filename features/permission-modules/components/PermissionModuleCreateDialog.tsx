"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { permissionModuleCreateAction } from "../actions/permission-module-create.action";
import { defaultPermissionModuleFormValues } from "../lib/permission-module-form-defaults";
import { mapFormValuesToPermissionModuleCreateInput } from "../lib/permission-module-form-mapper";
import type { PermissionModuleFormValues } from "../types/permission-module.type";
import { PermissionModuleForm } from "./PermissionModuleForm";

type PermissionModuleCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function PermissionModuleCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: PermissionModuleCreateDialogProps) {
  const handleSubmit = async (values: PermissionModuleFormValues) => {
    await toast.promise(
      permissionModuleCreateAction(
        mapFormValuesToPermissionModuleCreateInput(values),
      ).then(() => {
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create permission module</DialogTitle>
          <DialogDescription>
            Group related permissions under a module.
          </DialogDescription>
        </DialogHeader>

        <PermissionModuleForm
          defaultValues={defaultPermissionModuleFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
