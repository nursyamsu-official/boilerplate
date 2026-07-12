"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { productTypeCreateAction } from "../actions/product-type-create.action";
import { defaultProductTypeFormValues } from "../lib/product-type-form-defaults";
import { mapFormValuesToProductTypeCreateInput } from "../lib/product-type-form-mapper";
import { productTypeFormFieldsSchema } from "../schemas/product-type-create.schema";
import { ProductTypeForm } from "./ProductTypeForm";

type ProductTypeCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductTypeCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: ProductTypeCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create product type</DialogTitle>
          <DialogDescription>
            Add a new product type.
          </DialogDescription>
        </DialogHeader>

        <ProductTypeForm
          defaultValues={defaultProductTypeFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: productTypeFormFieldsSchema,
            action: productTypeCreateAction,
            mapInput: mapFormValuesToProductTypeCreateInput,
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
