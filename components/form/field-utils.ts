import type { AnyFieldApi } from "@tanstack/react-form";

export function hasFieldValidationError(field: AnyFieldApi): boolean {
  return field.state.meta.errors.length > 0;
}
