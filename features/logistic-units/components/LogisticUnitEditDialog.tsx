"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CompanyOption } from "@/features/companies";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { logisticUnitUpdateAction } from "../actions/logistic-unit-update.action";
import { mapFormValuesToLogisticUnitUpdateInput } from "../lib/logistic-unit-form-mapper";
import { logisticUnitFormFieldsSchema } from "../schemas/logistic-unit-create.schema";
import type {
  LogisticUnitFormValues,
  LogisticUnitParentOption,
} from "../types/logistic-unit.type";
import { LogisticUnitForm } from "./LogisticUnitForm";

type LogisticUnitEditDialogProps = {
  open: boolean;
  unitId: string | null;
  defaultValues: LogisticUnitFormValues | null;
  companyOptions: CompanyOption[];
  parentOptions: LogisticUnitParentOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function LogisticUnitEditDialog({
  open,
  unitId,
  defaultValues,
  companyOptions,
  parentOptions,
  onOpenChange,
  onSuccess,
}: LogisticUnitEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Logistic Unit</DialogTitle>
          <DialogDescription>
            Update unit details and hierarchy.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && unitId ? (
          <LogisticUnitForm
            key={unitId}
            defaultValues={defaultValues}
            companyOptions={companyOptions}
            excludeUnitId={unitId}
            initialParentOptions={parentOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: logisticUnitFormFieldsSchema,
              action: logisticUnitUpdateAction,
              mapInput: (values) =>
                mapFormValuesToLogisticUnitUpdateInput(unitId, values),
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
