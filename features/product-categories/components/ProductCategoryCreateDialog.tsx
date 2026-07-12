"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductGroupOption } from "@/features/product-groups";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { productCategoryCreateAction } from "../actions/product-category-create.action";
import { defaultProductCategoryFormValues } from "../lib/product-category-form-defaults";
import { mapFormValuesToProductCategoryCreateInput } from "../lib/product-category-form-mapper";
import { productCategoryFormFieldsSchema } from "../schemas/product-category-create.schema";
import { ProductCategoryForm } from "./ProductCategoryForm";

type ProductCategoryCreateDialogProps = {
  groupOptions: ProductGroupOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductCategoryCreateDialog({
  open,
  groupOptions,
  onOpenChange,
  onSuccess,
}: ProductCategoryCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create product category</DialogTitle>
          <DialogDescription>Add a new product category.</DialogDescription>
        </DialogHeader>

        <ProductCategoryForm
          groupOptions={groupOptions}
          defaultValues={defaultProductCategoryFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: productCategoryFormFieldsSchema,
            action: productCategoryCreateAction,
            mapInput: mapFormValuesToProductCategoryCreateInput,
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
