"use client";

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

import { productCreateAction } from "../actions/product-create.action";
import {
  defaultProductFormValues,
  getDefaultProductCategoryId,
} from "../lib/product-form-defaults";
import { mapFormValuesToProductCreateInput } from "../lib/product-form-mapper";
import { productFormFieldsSchema } from "../schemas/product-create.schema";
import { ProductForm } from "./ProductForm";

type ProductCreateDialogProps = {
  open: boolean;
  typeOptions: ProductTypeOption[];
  groupOptions: ProductGroupOption[];
  categoryOptions: ProductCategoryOption[];
  uomOptions: UomOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProductCreateDialog({
  open,
  typeOptions,
  groupOptions,
  categoryOptions,
  uomOptions,
  onOpenChange,
  onSuccess,
}: ProductCreateDialogProps) {
  const defaultGroupId = groupOptions[0]?.id ?? "";
  const defaultValues = {
    ...defaultProductFormValues,
    productTypeId: typeOptions[0]?.id ?? "",
    productGroupId: defaultGroupId,
    productCategoryId: getDefaultProductCategoryId(defaultGroupId, categoryOptions),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create product</DialogTitle>
          <DialogDescription>
            Add a new product with type, group, and category.
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          key={`${defaultValues.productTypeId}-${defaultValues.productGroupId}`}
          defaultValues={defaultValues}
          typeOptions={typeOptions}
          groupOptions={groupOptions}
          categoryOptions={categoryOptions}
          uomOptions={uomOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: productFormFieldsSchema,
            action: productCreateAction,
            mapInput: mapFormValuesToProductCreateInput,
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
