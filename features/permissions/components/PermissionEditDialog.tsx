"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PermissionModuleOption } from "@/features/permission-modules";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { permissionUpdateAction } from "../actions/permission-update.action";
import { mapFormValuesToPermissionUpdateInput } from "../lib/permission-form-mapper";
import { permissionFormFieldsSchema } from "../schemas/permission-create.schema";
import type { PermissionFormValues } from "../types/permission.type";
import { PermissionForm } from "./PermissionForm";

type PermissionEditDialogProps = {
  open: boolean;
  permissionId: string | null;
  defaultValues: PermissionFormValues | null;
  moduleOptions: PermissionModuleOption[];
  isSystem?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function PermissionEditDialog({
  open,
  permissionId,
  defaultValues,
  moduleOptions,
  isSystem = false,
  onOpenChange,
  onSuccess,
}: PermissionEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit permission</DialogTitle>
          <DialogDescription>Update permission details.</DialogDescription>
        </DialogHeader>

        {defaultValues && permissionId ? (
          <PermissionForm
            key={permissionId}
            defaultValues={defaultValues}
            moduleOptions={moduleOptions}
            isSystem={isSystem}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: permissionFormFieldsSchema,
              action: permissionUpdateAction,
              mapInput: (values) =>
                mapFormValuesToPermissionUpdateInput(permissionId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: createDialogSubmitSuccessHandler(
                onOpenChange,
                onSuccess,
              ),
            }}
          />
        ) : (
          <FormDialogSkeleton fields={4} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
