import { getAuthErrorMessage } from "@/features/auth/lib/auth-error"

type AuthClientResult = {
  error?: unknown | null
}

function hasAuthClientError(result: unknown): result is AuthClientResult {
  return typeof result === "object" && result !== null && "error" in result
}

export async function assertAuthClientSuccess<TResult>(operation: Promise<TResult>) {
  const result = await operation

  if (hasAuthClientError(result) && result.error) {
    throw new Error(getAuthErrorMessage(result.error))
  }

  return result
}
