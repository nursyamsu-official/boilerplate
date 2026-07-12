"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { NumberField } from "@/components/form/NumberField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { DocumentCategoryOption } from "@/features/document-categories";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import { formatDocumentNumber } from "../lib/document-number-formatter";
import type { DocumentTypeFormValues } from "../types/document-type.type";

type DocumentTypeFormProps = {
  defaultValues: DocumentTypeFormValues;
  categoryOptions: DocumentCategoryOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<DocumentTypeFormValues, unknown>;
  onCancel: () => void;
};

export function DocumentTypeForm({
  defaultValues,
  categoryOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: DocumentTypeFormProps) {
  const { onSubmitAsync, onSubmit } = useFormActionSubmit(submitConfig);
  const currentYear = new Date().getFullYear();

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
          <form.Field name="categoryId">
            {(field) => (
              <SelectField
                field={field}
                label="Category"
                placeholder="Select category"
                required
                options={categoryOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field name="code">
            {(field) => (
              <TextField
                field={field}
                label="Code"
                description="Lowercase letters, numbers, and underscores only."
                placeholder="purchase_order"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Purchase Order"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the document type"
              />
            )}
          </form.Field>

          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium">Number range</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Year is added automatically (e.g. {currentYear}).
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <form.Field name="numberPrefix">
                {(field) => (
                  <TextField
                    field={field}
                    label="Number prefix"
                    description="Static code before the year, e.g. PO or INV."
                    placeholder="PO"
                    required
                  />
                )}
              </form.Field>

              <form.Field name="numberSeparator">
                {(field) => (
                  <TextField
                    field={field}
                    label="Number separator"
                    description="Separator between prefix, year, and number."
                    placeholder="/"
                    required
                  />
                )}
              </form.Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="numberStart">
                  {(field) => (
                    <NumberField
                      field={field}
                      label="Start number"
                      min={1}
                      required
                    />
                  )}
                </form.Field>

                <form.Field name="numberEnd">
                  {(field) => (
                    <NumberField
                      field={field}
                      label="End number"
                      min={1}
                      required
                    />
                  )}
                </form.Field>

                <form.Field name="numberCurrent">
                  {(field) => (
                    <NumberField
                      field={field}
                      label="Current number"
                      min={1}
                      required
                    />
                  )}
                </form.Field>

                <form.Field name="numberPadding">
                  {(field) => (
                    <NumberField
                      field={field}
                      label="Number padding"
                      description="Zero-pad width for the numeric part."
                      min={1}
                      required
                    />
                  )}
                </form.Field>
              </div>

              <form.Subscribe
                selector={(state) => [
                  state.values.numberPrefix,
                  state.values.numberSeparator,
                  state.values.numberCurrent,
                  state.values.numberPadding,
                ]}
              >
                {([prefix, separator, current, padding]) => (
                  <div className="rounded-md bg-muted px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Preview: </span>
                    <span className="font-mono">
                      {formatDocumentNumber({
                        prefix: String(prefix ?? ""),
                        separator: String(separator ?? "/"),
                        number: Number(current ?? 1),
                        padding: Number(padding ?? 5),
                        year: currentYear,
                      })}
                    </span>
                  </div>
                )}
              </form.Subscribe>
            </div>
          </div>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive document types are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
