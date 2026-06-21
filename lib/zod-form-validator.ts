import type { ZodError, ZodType } from "zod";

import type { ActionFailure } from "@/lib/action-result";
import { resolveFieldForActionError } from "@/lib/action-error-field-map";

export type FormValidatorFieldErrors = {
  fields: Record<string, string>;
};

export type FormValidatorErrors = {
  form?: string;
  fields?: Record<string, string>;
};

export function mapActionFailureToValidatorErrors(
  failure: ActionFailure,
): FormValidatorErrors {
  const field = failure.field ?? resolveFieldForActionError(failure.message);

  if (field) {
    return { fields: { [field]: failure.message } };
  }

  return { form: failure.message };
}

export function mapZodErrorToFormFieldErrors(
  error: ZodError,
): FormValidatorFieldErrors {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    if (issue.path.length === 0) continue;

    const fieldName = issue.path.map(String).join(".");
    if (fields[fieldName]) continue;

    fields[fieldName] = issue.message;
  }

  return { fields };
}

export function createZodOnSubmitAsyncValidator<T>(schema: ZodType<T>) {
  return async ({ value }: { value: unknown }) => {
    const parsed = schema.safeParse(value);

    if (parsed.success) {
      return null;
    }

    return mapZodErrorToFormFieldErrors(parsed.error);
  };
}
