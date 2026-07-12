"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { ProductCategoryOption } from "@/features/product-categories";
import type { ProductGroupOption } from "@/features/product-groups";
import type { ProductTypeOption } from "@/features/product-types";
import type { UomOption } from "@/features/uoms";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { ProductFormValues } from "../types/product.type";

type ProductFormProps = {
  defaultValues: ProductFormValues;
  typeOptions: ProductTypeOption[];
  groupOptions: ProductGroupOption[];
  categoryOptions: ProductCategoryOption[];
  uomOptions: UomOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<ProductFormValues, unknown>;
  onCancel: () => void;
};

export function ProductForm({
  defaultValues,
  typeOptions,
  groupOptions,
  categoryOptions,
  uomOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: ProductFormProps) {
  const { onSubmitAsync, onSubmit } = useFormActionSubmit(submitConfig);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync,
    },
    onSubmit: async () => {
      await onSubmit();
    },
  });

  const formActions = (
    <>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                {pendingLabel}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        )}
      </form.Subscribe>
    </>
  );

  return (
    <form
      className={getFormClassName(layout)}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <FormShell layout={layout} actions={formActions}>
        <FieldGroup>
          <FormSubmitError form={form as never} />

          <form.Field name="code">
            {(field) => (
              <TextField
                field={field}
                label="Code"
                description="Lowercase letters, numbers, and underscores only."
                placeholder="product_code"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Product name"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the product"
              />
            )}
          </form.Field>

          <form.Field name="productTypeId">
            {(field) => (
              <SelectField
                field={field}
                label="Product type"
                placeholder="Select product type"
                required
                options={typeOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field
            name="productGroupId"
            listeners={{
              onChange: ({ value }) => {
                const categoryId = form.getFieldValue("productCategoryId");
                const category = categoryOptions.find(
                  (option) => option.id === categoryId,
                );

                if (category && category.groupId !== value) {
                  form.setFieldValue("productCategoryId", "");
                }
              },
            }}
          >
            {(field) => (
              <SelectField
                field={field}
                label="Product group"
                placeholder="Select product group"
                required
                options={groupOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.values.productGroupId}>
            {(productGroupId) => {
              const filteredCategories = productGroupId
                ? categoryOptions.filter(
                    (option) => option.groupId === productGroupId,
                  )
                : [];

              return (
                <form.Field name="productCategoryId">
                  {(field) => (
                    <SelectField
                      field={field}
                      label="Product category"
                      placeholder="Select product category"
                      required
                      disabled={!productGroupId}
                      options={filteredCategories.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))}
                    />
                  )}
                </form.Field>
              );
            }}
          </form.Subscribe>

          <form.Field name="baseUomId">
            {(field) => (
              <SelectField
                field={field}
                label="Base UOM"
                placeholder="Select base UOM"
                allowEmpty
                emptyLabel="No base UOM"
                options={uomOptions.map((option) => ({
                  value: option.id,
                  label: option.symbol
                    ? `${option.name} (${option.symbol})`
                    : option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive products are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
