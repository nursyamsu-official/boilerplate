"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { uomCreateAction } from "../actions/uom-create.action";
import { defaultUomFormValues } from "../lib/uom-form-defaults";
import { mapFormValuesToUomCreateInput } from "../lib/uom-form-mapper";
import { uomFormFieldsSchema } from "../schemas/uom-create.schema";
import { UomForm } from "./UomForm";

type UomCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function UomCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: UomCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create UOM</DialogTitle>
          <DialogDescription>
            Add a new unit of measure to the master data.
          </DialogDescription>
        </DialogHeader>

        <UomForm
          defaultValues={defaultUomFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: uomFormFieldsSchema,
            action: uomCreateAction,
            mapInput: mapFormValuesToUomCreateInput,
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
