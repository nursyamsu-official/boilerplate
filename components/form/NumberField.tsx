"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { hasFieldValidationError } from "@/components/form/field-utils";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type NumberFieldProps = {
  field: AnyFieldApi;
  label: string;
  description?: string;
  placeholder?: string;
  min?: number;
  disabled?: boolean;
};

export function NumberField({
  field,
  label,
  description,
  placeholder,
  min = 0,
  disabled = false,
}: NumberFieldProps) {
  const fieldId = field.name;
  const hasError = hasFieldValidationError(field);

  return (
    <Field data-invalid={hasError || undefined}>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={fieldId}
          name={field.name}
          type="number"
          min={min}
          value={field.state.value ?? 0}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          onBlur={field.handleBlur}
          onChange={(event) => {
            const nextValue = event.target.value;
            field.handleChange(nextValue === "" ? 0 : Number(nextValue));
          }}
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
