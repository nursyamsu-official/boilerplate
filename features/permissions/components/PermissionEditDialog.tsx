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

import { permissionUpdateAction } from "../actions/permission-update.action";
import { mapFormValuesToPermissionUpdateInput } from "../lib/permission-form-mapper";
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
  const handleSubmit = async (values: PermissionFormValues) => {
    if (!permissionId) return;

    await toast.promise(
      permissionUpdateAction(
        mapFormValuesToPermissionUpdateInput(permissionId, values),
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
