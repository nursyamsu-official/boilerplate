"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UomOption } from "@/features/uoms";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { uomGlobalConversionUpdateAction } from "../actions/uom-global-conversion-update.action";
import { mapFormValuesToUomGlobalConversionUpdateInput } from "../lib/uom-global-conversion-form-mapper";
import { uomGlobalConversionFormFieldsSchema } from "../schemas/uom-global-conversion-create.schema";
import type { UomGlobalConversionFormValues } from "../types/uom-global-conversion.type";
import { UomGlobalConversionForm } from "./UomGlobalConversionForm";

type UomGlobalConversionEditDialogProps = {
  open: boolean;
  conversionId: string | null;
  defaultValues: UomGlobalConversionFormValues | null;
  uomOptions: UomOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function UomGlobalConversionEditDialog({
  open,
  conversionId,
  defaultValues,
  uomOptions,
  onOpenChange,
  onSuccess,
}: UomGlobalConversionEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit global conversion</DialogTitle>
          <DialogDescription>
            Update conversion factor and status.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && conversionId ? (
          <UomGlobalConversionForm
            key={conversionId}
            defaultValues={defaultValues}
            uomOptions={uomOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: uomGlobalConversionFormFieldsSchema,
              action: uomGlobalConversionUpdateAction,
              mapInput: (values) =>
                mapFormValuesToUomGlobalConversionUpdateInput(
                  conversionId,
                  values,
                ),
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
          <FormDialogSkeleton fields={5} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
