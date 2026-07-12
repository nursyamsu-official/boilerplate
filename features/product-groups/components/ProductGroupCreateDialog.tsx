"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { productGroupCreateAction } from "../actions/product-group-create.action";
import { defaultProductGroupFormValues } from "../lib/product-group-form-defaults";
import { mapFormValuesToProductGroupCreateInput } from "../lib/product-group-form-mapper";
import { productGroupFormFieldsSchema } from "../schemas/product-group-create.schema";
import { ProductGroupForm } from "./ProductGroupForm";

type ProductGroupCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductGroupCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: ProductGroupCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create product group</DialogTitle>
          <DialogDescription>
            Add a new product group.
          </DialogDescription>
        </DialogHeader>

        <ProductGroupForm
          defaultValues={defaultProductGroupFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: productGroupFormFieldsSchema,
            action: productGroupCreateAction,
            mapInput: mapFormValuesToProductGroupCreateInput,
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
