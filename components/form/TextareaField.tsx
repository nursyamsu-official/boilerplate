"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { hasFieldValidationError, RenderFieldLabel } from "@/components/form/field-utils";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type TextareaFieldProps = {
  field: AnyFieldApi;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  required?: boolean;
};

export function TextareaField({
  field,
  label,
  description,
  placeholder,
  disabled = false,
  rows = 4,
  required = false,
}: TextareaFieldProps) {
  const fieldId = field.name;
  const hasError = hasFieldValidationError(field);

  return (
    <Field data-invalid={hasError || undefined}>
      <FieldLabel htmlFor={fieldId}>
        <RenderFieldLabel label={label} required={required} />
      </FieldLabel>
      <FieldContent>
        <Textarea
          id={fieldId}
          name={field.name}
          value={String(field.state.value ?? "")}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
        />
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
        {hasError ? (
          <FieldError errors={field.state.meta.errors} />
        ) : null}
      </FieldContent>
    </Field>
  );
}
