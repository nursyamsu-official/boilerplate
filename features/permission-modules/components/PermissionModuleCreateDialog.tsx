"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { permissionModuleCreateAction } from "../actions/permission-module-create.action";
import { defaultPermissionModuleFormValues } from "../lib/permission-module-form-defaults";
import { mapFormValuesToPermissionModuleCreateInput } from "../lib/permission-module-form-mapper";
import { permissionModuleFormFieldsSchema } from "../schemas/permission-module-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: permissionModuleFormFieldsSchema,
            action: permissionModuleCreateAction,
            mapInput: mapFormValuesToPermissionModuleCreateInput,
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
