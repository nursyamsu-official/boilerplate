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

import { purchasingGroupUpdateAction } from "../actions/purchasing-group-update.action";
import { mapFormValuesToPurchasingGroupUpdateInput } from "../lib/purchasing-group-form-mapper";
import { purchasingGroupFormFieldsSchema } from "../schemas/purchasing-group-create.schema";
import type {
  PurchasingGroupFormValues,
  PurchasingGroupParentOption,
} from "../types/purchasing-group.type";
import { PurchasingGroupForm } from "./PurchasingGroupForm";

type PurchasingGroupEditDialogProps = {
  open: boolean;
  unitId: string | null;
  defaultValues: PurchasingGroupFormValues | null;
  companyOptions: CompanyOption[];
  parentOptions: PurchasingGroupParentOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function PurchasingGroupEditDialog({
  open,
  unitId,
  defaultValues,
  companyOptions,
  parentOptions,
  onOpenChange,
  onSuccess,
}: PurchasingGroupEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Purchasing Group</DialogTitle>
          <DialogDescription>
            Update unit details and hierarchy.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && unitId ? (
          <PurchasingGroupForm
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
              schema: purchasingGroupFormFieldsSchema,
              action: purchasingGroupUpdateAction,
              mapInput: (values) =>
                mapFormValuesToPurchasingGroupUpdateInput(unitId, values),
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
