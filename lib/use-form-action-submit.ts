"use client";

import { toast } from "sonner";
import type { ZodTypeAny } from "zod";

import { formatActionFailureToast, type ActionResult } from "@/lib/action-result";
import {
  mapActionFailureToValidatorErrors,
  mapZodErrorToFormFieldErrors,
} from "@/lib/zod-form-validator";

const DIALOG_CLOSE_REFRESH_DELAY_MS = 150;

export function createDialogSubmitSuccessHandler(
  onOpenChange: (open: boolean) => void,
  onRefresh: () => void,
): () => void {
  return () => {
    onOpenChange(false);
    window.setTimeout(onRefresh, DIALOG_CLOSE_REFRESH_DELAY_MS);
  };
}

export function createDialogSubmitSuccessHandlerWithData<TResult>(
  onOpenChange: (open: boolean) => void,
  onRefresh: () => void,
  onClose?: (data: TResult) => void,
): (data: TResult) => void {
  return (data) => {
    onOpenChange(false);
    onClose?.(data);
    window.setTimeout(onRefresh, DIALOG_CLOSE_REFRESH_DELAY_MS);
  };
}

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
      return mapActionFailureToValidatorErrors(result);
    }

    await toast.promise(
      Promise.resolve(config.onSuccess(result.data)),
      {
        loading: config.toast.loading,
        success: config.toast.success,
        error: config.toast.errorFallback,
      },
    );

    return null;
  };

  const onSubmit = async () => {
    // Success side effects run in onSubmitAsync after the action completes.
  };

  return { onSubmitAsync, onSubmit };
}
