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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  field: AnyFieldApi;
  label: string;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
};

export function SelectField({
  field,
  label,
  description,
  options,
  placeholder = "Select an option",
  disabled = false,
  allowEmpty = false,
  emptyLabel = "None",
}: SelectFieldProps) {
  const fieldId = field.name;
  const hasError = hasFieldValidationError(field);
  const rawValue = field.state.value ? String(field.state.value) : "";
  const value = rawValue || (allowEmpty ? "__empty__" : "");

  return (
    <Field data-invalid={hasError || undefined}>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Select
          value={value}
          disabled={disabled}
          onValueChange={(nextValue) => {
            field.handleChange(allowEmpty && nextValue === "__empty__" ? null : nextValue);
          }}
        >
          <SelectTrigger id={fieldId} aria-invalid={hasError || undefined}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {allowEmpty ? (
              <SelectItem value="__empty__">{emptyLabel}</SelectItem>
            ) : null}
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
