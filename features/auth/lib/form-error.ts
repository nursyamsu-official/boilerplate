export function getFieldErrorMessages(errors: unknown[] | undefined) {
  if (!errors?.length) {
    return []
  }

  return errors
    .map((error) => {
      if (typeof error === "string") {
        return error
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        return error.message
      }

      return "Invalid value"
    })
    .filter(Boolean)
}
