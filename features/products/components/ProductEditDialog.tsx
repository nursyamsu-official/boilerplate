"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductCategoryOption } from "@/features/product-categories";
import type { ProductGroupOption } from "@/features/product-groups";
import type { ProductTypeOption } from "@/features/product-types";
import type { UomOption } from "@/features/uoms";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { productUpdateAction } from "../actions/product-update.action";
import { mapFormValuesToProductUpdateInput } from "../lib/product-form-mapper";
import { productFormFieldsSchema } from "../schemas/product-create.schema";
import type { ProductFormValues } from "../types/product.type";
import { ProductForm } from "./ProductForm";

type ProductEditDialogProps = {
  open: boolean;
  productId: string | null;
  defaultValues: ProductFormValues | null;
  typeOptions: ProductTypeOption[];
  groupOptions: ProductGroupOption[];
  categoryOptions: ProductCategoryOption[];
  uomOptions: UomOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductEditDialog({
  open,
  productId,
  defaultValues,
  typeOptions,
  groupOptions,
  categoryOptions,
  uomOptions,
  onOpenChange,
  onSuccess,
}: ProductEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>Update product details and classification.</DialogDescription>
        </DialogHeader>

        {defaultValues && productId ? (
          <ProductForm
            key={productId}
            defaultValues={defaultValues}
            typeOptions={typeOptions}
            groupOptions={groupOptions}
            categoryOptions={categoryOptions}
            uomOptions={uomOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: productFormFieldsSchema,
              action: productUpdateAction,
              mapInput: (values) => mapFormValuesToProductUpdateInput(productId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: createDialogSubmitSuccessHandler(onOpenChange, onSuccess),
            }}
          />
        ) : (
          <FormDialogSkeleton fields={8} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
