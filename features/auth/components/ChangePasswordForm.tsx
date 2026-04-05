"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/sonner"
import { authClient } from "@/lib/auth-client"
import { changePasswordSchema } from "@/features/auth/schemas/auth.schema"

type ChangePasswordFieldErrors = {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export function ChangePasswordForm() {
  const router = useRouter()
  const [fieldErrors, setFieldErrors] = useState<ChangePasswordFieldErrors>({})

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const parsedValue = changePasswordSchema.safeParse(value)

      if (!parsedValue.success) {
        const errors = parsedValue.error.flatten().fieldErrors
        setFieldErrors({
          currentPassword: errors.currentPassword?.[0],
          newPassword: errors.newPassword?.[0],
          confirmPassword: errors.confirmPassword?.[0],
        })
        throw new Error("Please check your form")
      }

      setFieldErrors({})

      const submitPromise = (async () => {
        const result = await authClient.changePassword({
          currentPassword: parsedValue.data.currentPassword,
          newPassword: parsedValue.data.newPassword,
          revokeOtherSessions: true,
        })

        if (result.error) {
          throw new Error("Failed to change password")
        }

        router.push("/dashboard/settings/security/password-changed")
        router.refresh()
      })()

      toast.promise(submitPromise, {
        loading: "Saving...",
        success: "Updated successfully",
        error: "Failed to save",
      })

      await submitPromise
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
        <form.Field name="currentPassword">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    if (fieldErrors.currentPassword) {
                      setFieldErrors((previous) => ({
                        ...previous,
                        currentPassword: undefined,
                      }))
                    }
                    field.handleChange(event.target.value)
                  }}
                />
                <FieldError>{fieldErrors.currentPassword}</FieldError>
              </FieldContent>
            </Field>
          )}
        </form.Field>

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
            {isSubmitting ? "Saving..." : "Change password"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
