"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { uomUpdateAction } from "../actions/uom-update.action";
import { mapFormValuesToUomUpdateInput } from "../lib/uom-form-mapper";
import { uomFormFieldsSchema } from "../schemas/uom-create.schema";
import type { UomFormValues } from "../types/uom.type";
import { UomForm } from "./UomForm";

type UomEditDialogProps = {
  open: boolean;
  uomId: string | null;
  defaultValues: UomFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function UomEditDialog({
  open,
  uomId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: UomEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit UOM</DialogTitle>
          <DialogDescription>Update unit of measure details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && uomId ? (
          <UomForm
            key={uomId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: uomFormFieldsSchema,
              action: uomUpdateAction,
              mapInput: (values) => mapFormValuesToUomUpdateInput(uomId, values),
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
          <FormDialogSkeleton fields={7} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
