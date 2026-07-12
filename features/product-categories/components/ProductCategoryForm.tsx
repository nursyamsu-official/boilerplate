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
import type { ProductGroupOption } from "@/features/product-groups";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { ProductCategoryFormValues } from "../types/product-category.type";

type ProductCategoryFormProps = {
  defaultValues: ProductCategoryFormValues;
  groupOptions: ProductGroupOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<ProductCategoryFormValues, unknown>;
  onCancel: () => void;
};

export function ProductCategoryForm({
  defaultValues,
  groupOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: ProductCategoryFormProps) {
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
          <form.Field name="groupId">
            {(field) => (
              <SelectField
                field={field}
                label="Product Group"
                placeholder="Select product group"
                options={groupOptions.map((group) => ({
                  value: group.id,
                  label: group.name,
                }))}
                required
              />
            )}
          </form.Field>

          <form.Field name="code">
            {(field) => (
              <TextField
                field={field}
                label="Code"
                description="Lowercase letters, numbers, and underscores only."
                placeholder="bearing"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Bearing"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the product category"
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive product categories are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
