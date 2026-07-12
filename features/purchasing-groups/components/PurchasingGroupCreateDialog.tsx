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

import { purchasingGroupCreateAction } from "../actions/purchasing-group-create.action";
import { defaultPurchasingGroupFormValues } from "../lib/purchasing-group-form-defaults";
import { mapFormValuesToPurchasingGroupCreateInput } from "../lib/purchasing-group-form-mapper";
import { purchasingGroupFormFieldsSchema } from "../schemas/purchasing-group-create.schema";
import { PurchasingGroupForm } from "./PurchasingGroupForm";

type PurchasingGroupCreateDialogProps = {
  open: boolean;
  companyOptions: CompanyOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function PurchasingGroupCreateDialog({
  open,
  companyOptions,
  onOpenChange,
  onSuccess,
}: PurchasingGroupCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Purchasing Group</DialogTitle>
          <DialogDescription>
            Add a new unit to your organization hierarchy.
          </DialogDescription>
        </DialogHeader>

        <PurchasingGroupForm
          defaultValues={defaultPurchasingGroupFormValues}
          companyOptions={companyOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: purchasingGroupFormFieldsSchema,
            action: purchasingGroupCreateAction,
            mapInput: mapFormValuesToPurchasingGroupCreateInput,
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
