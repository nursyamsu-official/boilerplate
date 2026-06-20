"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

export function hasFieldValidationError(field: AnyFieldApi): boolean {
  return field.state.meta.errors.length > 0;
}

type RenderFieldLabelProps = {
  label: string;
  required?: boolean;
};

export function RenderFieldLabel({ label, required = false }: RenderFieldLabelProps) {
  return (
    <>
      {label}
      {required ? (
        <span className="text-destructive" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </>
  );
}
