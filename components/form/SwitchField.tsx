"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { hasFieldValidationError } from "@/components/form/field-utils";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

type SwitchFieldProps = {
  field: AnyFieldApi;
  label: string;
  description?: string;
  disabled?: boolean;
};

export function SwitchField({
  field,
  label,
  description,
  disabled = false,
}: SwitchFieldProps) {
  const fieldId = field.name;
  const hasError = hasFieldValidationError(field);

  return (
    <Field
      orientation="horizontal"
      data-invalid={hasError || undefined}
      className="items-center justify-between rounded-lg border p-3"
    >
      <FieldContent>
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
        {hasError ? (
          <FieldError errors={field.state.meta.errors} />
        ) : null}
      </FieldContent>
      <Switch
        id={fieldId}
        checked={Boolean(field.state.value)}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
    </Field>
  );
}
