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

import { productGroupUpdateAction } from "../actions/product-group-update.action";
import { mapFormValuesToProductGroupUpdateInput } from "../lib/product-group-form-mapper";
import { productGroupFormFieldsSchema } from "../schemas/product-group-create.schema";
import type { ProductGroupFormValues } from "../types/product-group.type";
import { ProductGroupForm } from "./ProductGroupForm";

type ProductGroupEditDialogProps = {
  open: boolean;
  productGroupId: string | null;
  defaultValues: ProductGroupFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductGroupEditDialog({
  open,
  productGroupId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: ProductGroupEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit product group</DialogTitle>
          <DialogDescription>Update product group details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && productGroupId ? (
          <ProductGroupForm
            key={productGroupId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: productGroupFormFieldsSchema,
              action: productGroupUpdateAction,
              mapInput: (values) =>
                mapFormValuesToProductGroupUpdateInput(productGroupId, values),
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
