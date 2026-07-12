"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductGroupOption } from "@/features/product-groups";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { productCategoryUpdateAction } from "../actions/product-category-update.action";
import { mapFormValuesToProductCategoryUpdateInput } from "../lib/product-category-form-mapper";
import { productCategoryFormFieldsSchema } from "../schemas/product-category-create.schema";
import type { ProductCategoryFormValues } from "../types/product-category.type";
import { ProductCategoryForm } from "./ProductCategoryForm";

type ProductCategoryEditDialogProps = {
  groupOptions: ProductGroupOption[];
  open: boolean;
  productCategoryId: string | null;
  defaultValues: ProductCategoryFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductCategoryEditDialog({
  open,
  productCategoryId,
  defaultValues,
  groupOptions,
  onOpenChange,
  onSuccess,
}: ProductCategoryEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit product category</DialogTitle>
          <DialogDescription>Update product category details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && productCategoryId ? (
          <ProductCategoryForm
            key={productCategoryId}
            groupOptions={groupOptions}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: productCategoryFormFieldsSchema,
              action: productCategoryUpdateAction,
              mapInput: (values) =>
                mapFormValuesToProductCategoryUpdateInput(productCategoryId, values),
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
          <FormDialogSkeleton fields={5} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
