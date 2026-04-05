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
import { resetPasswordSchema } from "@/features/auth/schemas/auth.schema"

type ResetPasswordFormProps = {
  token?: string
}

type ResetPasswordFieldErrors = {
  newPassword?: string
  confirmPassword?: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter()
  const [fieldErrors, setFieldErrors] = useState<ResetPasswordFieldErrors>({})

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (!token) {
        throw new Error("Reset token is required")
      }

      const parsedValue = resetPasswordSchema.safeParse(value)

      if (!parsedValue.success) {
        const errors = parsedValue.error.flatten().fieldErrors
        setFieldErrors({
          newPassword: errors.newPassword?.[0],
          confirmPassword: errors.confirmPassword?.[0],
        })
        throw new Error("Please check your form")
      }

      setFieldErrors({})

      await toast.promise(
        (async () => {
          const result = await authClient.resetPassword({
            newPassword: parsedValue.data.newPassword,
            token,
          })

          if (result.error) {
            throw new Error("Failed to reset password")
          }

          router.push("/sign-in")
          router.refresh()
        })(),
        {
          loading: "Saving...",
          success: "Saved successfully",
          error: "Failed to save",
        }
      )
    },
  })

  if (!token) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-destructive">Reset token is missing or invalid.</p>
        <Link className="text-xs text-primary hover:underline" href="/forgot-password">
          Request a new reset link
        </Link>
      </div>
    )
  }

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
        <form.Field name="newPassword">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    if (fieldErrors.newPassword) {
                      setFieldErrors((previous) => ({
                        ...previous,
                        newPassword: undefined,
                      }))
                    }
                    field.handleChange(event.target.value)
                  }}
                  placeholder="********"
                />
                <FieldError>{fieldErrors.newPassword}</FieldError>
              </FieldContent>
            </Field>
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    if (fieldErrors.confirmPassword) {
                      setFieldErrors((previous) => ({
                        ...previous,
                        confirmPassword: undefined,
                      }))
                    }
                    field.handleChange(event.target.value)
                  }}
                  placeholder="********"
                />
                <FieldError>{fieldErrors.confirmPassword}</FieldError>
              </FieldContent>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Reset password"}
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
