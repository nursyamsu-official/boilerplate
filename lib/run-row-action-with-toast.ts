"use client";

import { toast } from "sonner";

import {
  formatActionFailureToast,
  type ActionResult,
} from "@/lib/action-result";

export type RowActionToastConfig = {
  loading: string;
  success: string;
  errorFallback: string;
};

export type RunRowActionWithToastConfig<T> = {
  action: () => Promise<ActionResult<T>>;
  onSuccess: () => void | Promise<void>;
  toast: RowActionToastConfig;
  setPending?: (pending: boolean) => void;
};

export function runRowActionWithToast<T>(
  config: RunRowActionWithToastConfig<T>,
): void {
  const { errorFallback } = config.toast;

  config.setPending?.(true);

  void (async () => {
    const toastId = toast.loading(config.toast.loading);

    try {
      const result = await config.action();

      if (!result.ok) {
        toast.error(formatActionFailureToast(errorFallback, result.message), {
          id: toastId,
        });
        return;
      }

      toast.success(config.toast.success, { id: toastId });
      await config.onSuccess();
    } catch {
      toast.error(errorFallback, { id: toastId });
    } finally {
      config.setPending?.(false);
    }
  })();
}
