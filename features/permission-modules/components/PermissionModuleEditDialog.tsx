"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { permissionModuleUpdateAction } from "../actions/permission-module-update.action";
import { mapFormValuesToPermissionModuleUpdateInput } from "../lib/permission-module-form-mapper";
import { permissionModuleFormFieldsSchema } from "../schemas/permission-module-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: permissionModuleFormFieldsSchema,
              action: permissionModuleUpdateAction,
              mapInput: (values) =>
                mapFormValuesToPermissionModuleUpdateInput(moduleId, values),
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
          <FormDialogSkeleton fields={6} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
