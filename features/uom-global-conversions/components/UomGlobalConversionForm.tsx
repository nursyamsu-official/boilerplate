"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { NumberField } from "@/components/form/NumberField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { UomOption } from "@/features/uoms";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { UomGlobalConversionFormValues } from "../types/uom-global-conversion.type";

type UomGlobalConversionFormProps = {
  defaultValues: UomGlobalConversionFormValues;
  uomOptions: UomOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<UomGlobalConversionFormValues, unknown>;
  onCancel: () => void;
};

function formatUomOptionLabel(option: UomOption) {
  return option.symbol
    ? `${option.code} (${option.symbol}) — ${option.name}`
    : `${option.code} — ${option.name}`;
}

export function UomGlobalConversionForm({
  defaultValues,
  uomOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: UomGlobalConversionFormProps) {
  const { onSubmitAsync, onSubmit } = useFormActionSubmit(submitConfig);

  const uomSelectOptions = uomOptions.map((option) => ({
    value: option.id,
    label: formatUomOptionLabel(option),
  }));

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
          <form.Field name="fromUomId">
            {(field) => (
              <SelectField
                field={field}
                label="From UOM"
                options={uomSelectOptions}
                placeholder="Select source UOM"
                required
              />
            )}
          </form.Field>

          <form.Field name="toUomId">
            {(field) => (
              <SelectField
                field={field}
                label="To UOM"
                options={uomSelectOptions}
                placeholder="Select target UOM"
                required
              />
            )}
          </form.Field>

          <form.Field name="conversionFactor">
            {(field) => (
              <NumberField
                field={field}
                label="Conversion factor"
                description="Multiply quantity in the from UOM by this factor to get the to UOM quantity."
                min={0.000001}
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Optional notes about this conversion"
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive conversions are not used in calculations."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
