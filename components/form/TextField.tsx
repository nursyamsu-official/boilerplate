"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type TextFieldProps = {
  field: AnyFieldApi;
  label: string;
  description?: string;
  type?: React.ComponentProps<"input">["type"];
  placeholder?: string;
  disabled?: boolean;
};

export function TextField({
  field,
  label,
  description,
  type = "text",
  placeholder,
  disabled = false,
}: TextFieldProps) {
  const fieldId = field.name;
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  return (
    <Field data-invalid={hasError || undefined}>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={fieldId}
          name={field.name}
          type={type}
          value={String(field.state.value ?? "")}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError || undefined}
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
