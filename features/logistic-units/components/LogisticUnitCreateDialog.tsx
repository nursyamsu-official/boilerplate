"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CompanyOption } from "@/features/companies";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { logisticUnitCreateAction } from "../actions/logistic-unit-create.action";
import { defaultLogisticUnitFormValues } from "../lib/logistic-unit-form-defaults";
import { mapFormValuesToLogisticUnitCreateInput } from "../lib/logistic-unit-form-mapper";
import { logisticUnitFormFieldsSchema } from "../schemas/logistic-unit-create.schema";
import { LogisticUnitForm } from "./LogisticUnitForm";

type LogisticUnitCreateDialogProps = {
  open: boolean;
  companyOptions: CompanyOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function LogisticUnitCreateDialog({
  open,
  companyOptions,
  onOpenChange,
  onSuccess,
}: LogisticUnitCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Logistic Unit</DialogTitle>
          <DialogDescription>
            Add a new unit to your organization hierarchy.
          </DialogDescription>
        </DialogHeader>

        <LogisticUnitForm
          defaultValues={defaultLogisticUnitFormValues}
          companyOptions={companyOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: logisticUnitFormFieldsSchema,
            action: logisticUnitCreateAction,
            mapInput: mapFormValuesToLogisticUnitCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: createDialogSubmitSuccessHandler(
              onOpenChange,
              onSuccess,
            ),
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
