import { resolveFieldForActionError } from "@/lib/action-error-field-map";

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string; field?: string };

export type ActionFailure = Extract<ActionResult, { ok: false }>;

const GENERIC_ACTION_FAILURE_MESSAGE = "Something went wrong";

export async function runAction<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : GENERIC_ACTION_FAILURE_MESSAGE;

    return {
      ok: false,
      message,
      field: resolveFieldForActionError(message),
    };
  }
}

export function getActionErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message
  ) {
    return error.message;
  }

  return fallback;
}

export function createToastErrorHandler(
  fallback: string,
): (error: unknown) => string {
  return (error) => getActionErrorMessage(error, fallback);
}

export function formatActionFailureToast(
  fallback: string,
  message: string,
): string {
  if (!message || message === GENERIC_ACTION_FAILURE_MESSAGE) {
    return fallback;
  }

  return `${fallback}: ${message}`;
}
