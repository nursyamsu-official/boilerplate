"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PermissionModuleOption } from "@/features/permission-modules";

import { permissionCreateAction } from "../actions/permission-create.action";
import { defaultPermissionFormValues } from "../lib/permission-form-defaults";
import { mapFormValuesToPermissionCreateInput } from "../lib/permission-form-mapper";
import { permissionFormFieldsSchema } from "../schemas/permission-create.schema";
import { PermissionForm } from "./PermissionForm";

type PermissionCreateDialogProps = {
  open: boolean;
  moduleOptions: PermissionModuleOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function PermissionCreateDialog({
  open,
  moduleOptions,
  onOpenChange,
  onSuccess,
}: PermissionCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create permission</DialogTitle>
          <DialogDescription>
            Define a permission that can be assigned to roles.
          </DialogDescription>
        </DialogHeader>

        <PermissionForm
          defaultValues={defaultPermissionFormValues}
          moduleOptions={moduleOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: permissionFormFieldsSchema,
            action: permissionCreateAction,
            mapInput: mapFormValuesToPermissionCreateInput,
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
