"use client";

import { useRef } from "react";
import { toast } from "sonner";
import type { ZodTypeAny } from "zod";

import { formatActionFailureToast, type ActionResult } from "@/lib/action-result";
import {
  mapActionFailureToValidatorErrors,
  mapZodErrorToFormFieldErrors,
} from "@/lib/zod-form-validator";

export type FormActionSubmitConfig<TValues, TResult> = {
  schema: ZodTypeAny;
  action: (input: unknown) => Promise<ActionResult<TResult>>;
  mapInput: (values: TValues) => unknown;
  toast: {
    loading: string;
    success: string;
    errorFallback: string;
  };
  onSuccess: (data: TResult) => void | Promise<void>;
};

export function useFormActionSubmit<TValues, TResult>(
  config: FormActionSubmitConfig<TValues, TResult>,
) {
  const successDataRef = useRef<TResult | null>(null);

  const onSubmitAsync = async ({ value }: { value: TValues }) => {
    const parsed = config.schema.safeParse(value);

    if (!parsed.success) {
      return mapZodErrorToFormFieldErrors(parsed.error);
    }

    const result = await config.action(config.mapInput(parsed.data as TValues));

    if (!result.ok) {
      toast.error(
        formatActionFailureToast(config.toast.errorFallback, result.message),
      );
      successDataRef.current = null;
      return mapActionFailureToValidatorErrors(result);
    }

    successDataRef.current = result.data;
    return null;
  };

  const onSubmit = async () => {
    const data = successDataRef.current;
    successDataRef.current = null;

    if (data === null) {
      return;
    }

    await toast.promise(
      Promise.resolve(config.onSuccess(data)),
      {
        loading: config.toast.loading,
        success: config.toast.success,
        error: config.toast.errorFallback,
      },
    );
  };

  return { onSubmitAsync, onSubmit };
}
