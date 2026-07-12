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

import { productTypeUpdateAction } from "../actions/product-type-update.action";
import { mapFormValuesToProductTypeUpdateInput } from "../lib/product-type-form-mapper";
import { productTypeFormFieldsSchema } from "../schemas/product-type-create.schema";
import type { ProductTypeFormValues } from "../types/product-type.type";
import { ProductTypeForm } from "./ProductTypeForm";

type ProductTypeEditDialogProps = {
  open: boolean;
  productTypeId: string | null;
  defaultValues: ProductTypeFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductTypeEditDialog({
  open,
  productTypeId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: ProductTypeEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit product type</DialogTitle>
          <DialogDescription>Update product type details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && productTypeId ? (
          <ProductTypeForm
            key={productTypeId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: productTypeFormFieldsSchema,
              action: productTypeUpdateAction,
              mapInput: (values) =>
                mapFormValuesToProductTypeUpdateInput(productTypeId, values),
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
          <FormDialogSkeleton fields={4} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
