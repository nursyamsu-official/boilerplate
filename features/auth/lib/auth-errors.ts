export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (!error) {
    return fallback
  }

  if (typeof error === "string") {
    return error
  }

  if (error instanceof Error) {
    return error.message || fallback
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message

    if (typeof message === "string" && message.length > 0) {
      return message
    }
  }

  return fallback
}
