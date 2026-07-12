"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UomOption } from "@/features/uoms";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { uomGlobalConversionCreateAction } from "../actions/uom-global-conversion-create.action";
import { defaultUomGlobalConversionFormValues } from "../lib/uom-global-conversion-form-defaults";
import { mapFormValuesToUomGlobalConversionCreateInput } from "../lib/uom-global-conversion-form-mapper";
import { uomGlobalConversionFormFieldsSchema } from "../schemas/uom-global-conversion-create.schema";
import { UomGlobalConversionForm } from "./UomGlobalConversionForm";

type UomGlobalConversionCreateDialogProps = {
  open: boolean;
  uomOptions: UomOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function UomGlobalConversionCreateDialog({
  open,
  uomOptions,
  onOpenChange,
  onSuccess,
}: UomGlobalConversionCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create global conversion</DialogTitle>
          <DialogDescription>
            Define a conversion factor between two units of measure.
          </DialogDescription>
        </DialogHeader>

        <UomGlobalConversionForm
          defaultValues={defaultUomGlobalConversionFormValues}
          uomOptions={uomOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: uomGlobalConversionFormFieldsSchema,
            action: uomGlobalConversionCreateAction,
            mapInput: mapFormValuesToUomGlobalConversionCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: createDialogSubmitSuccessHandler(onOpenChange, onSuccess),
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
