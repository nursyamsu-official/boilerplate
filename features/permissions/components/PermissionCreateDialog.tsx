"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PermissionModuleOption } from "@/features/permission-modules";

import { permissionCreateAction } from "../actions/permission-create.action";
import { defaultPermissionFormValues } from "../lib/permission-form-defaults";
import { mapFormValuesToPermissionCreateInput } from "../lib/permission-form-mapper";
import type { PermissionFormValues } from "../types/permission.type";
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
  const handleSubmit = async (values: PermissionFormValues) => {
    await toast.promise(
      permissionCreateAction(
        mapFormValuesToPermissionCreateInput(values),
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
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
