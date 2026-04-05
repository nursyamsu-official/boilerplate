"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/sonner"
import { authClient } from "@/lib/auth-client"
import { forgotPasswordSchema } from "@/features/auth/schemas/auth.schema"

type ForgotPasswordFieldErrors = {
  email?: string
}

export function ForgotPasswordForm() {
  const router = useRouter()
  const [fieldErrors, setFieldErrors] = useState<ForgotPasswordFieldErrors>({})

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      const parsedValue = forgotPasswordSchema.safeParse(value)

      if (!parsedValue.success) {
        const errors = parsedValue.error.flatten().fieldErrors
        setFieldErrors({
          email: errors.email?.[0],
        })
        throw new Error("Please check your form")
      }

      setFieldErrors({})

      await toast.promise(
        (async () => {
          const result = await authClient.requestPasswordReset({
            email: parsedValue.data.email,
            redirectTo: `${window.location.origin}/reset-password`,
          })

          if (result.error) {
            throw new Error("Failed to request reset password")
          }

          router.push("/check-email")
          router.refresh()
        })(),
        {
          loading: "Sending reset link...",
          success: "Saved successfully",
          error: "Failed to save",
        }
      )
    },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Registered Email</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    if (fieldErrors.email) {
                      setFieldErrors((previous) => ({ ...previous, email: undefined }))
                    }
                    field.handleChange(event.target.value)
                  }}
                  placeholder="you@example.com"
                />
                <FieldError>{fieldErrors.email}</FieldError>
              </FieldContent>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send reset link"}
          </Button>
        )}
      </form.Subscribe>

      <div className="flex justify-end">
        <Link className="text-xs text-muted-foreground hover:underline" href="/sign-in">
          Back to login
        </Link>
      </div>
    </form>
  )
}
