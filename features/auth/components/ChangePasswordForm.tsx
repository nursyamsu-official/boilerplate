"use client"

import { type FormEvent, useRef, useState } from "react"
import { useForm } from "@tanstack/react-form"
import { LoaderCircle } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/sonner"
import { changePassword } from "@/lib/auth-client"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { assertAuthClientSuccess } from "@/features/auth/lib/auth-client-result"
import { getFieldErrorMessages } from "@/features/auth/lib/form-error"
import { changePasswordSchema } from "@/features/auth/schemas/change-password.schema"

export function ChangePasswordForm() {
  const submitLockRef = useRef(false)
  const [isSubmitPending, setIsSubmitPending] = useState(false)

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: true,
    },
    validators: {
      onChange: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const request = assertAuthClientSuccess(
        changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: value.revokeOtherSessions,
        })
      )

      toast.promise(request, {
        loading: "Saving...",
        success: "Your password has been updated successfully",
        error: "Failed to save",
      })

      await request
    },
  })

  const isPending = form.state.isSubmitting || isSubmitPending

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitLockRef.current || form.state.isSubmitting) {
      return
    }

    submitLockRef.current = true
    setIsSubmitPending(true)

    try {
      await form.handleSubmit()
    } finally {
      submitLockRef.current = false
      setIsSubmitPending(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Update your password and optionally sign out other active sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" aria-busy={isPending} onSubmit={(event) => void handleFormSubmit(event)}>
          <form.Field name="currentPassword">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Current password"
                type="password"
                autoComplete="current-password"
                disabled={isPending}
                value={field.state.value}
                invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                errors={getFieldErrorMessages(field.state.meta.errors)}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="New password"
                type="password"
                autoComplete="new-password"
                disabled={isPending}
                value={field.state.value}
                invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                errors={getFieldErrorMessages(field.state.meta.errors)}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Confirm new password"
                type="password"
                autoComplete="new-password"
                disabled={isPending}
                value={field.state.value}
                invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                errors={getFieldErrorMessages(field.state.meta.errors)}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

          <form.Field name="revokeOtherSessions">
            {(field) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={field.name}
                  disabled={isPending}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Sign out other sessions</FieldLabel>
                  <FieldDescription>
                    Recommended if you changed your password for security reasons.
                  </FieldDescription>
                </FieldContent>
              </Field>
            )}
          </form.Field>

          <Button type="submit" disabled={!form.state.canSubmit || isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : null}
            {isPending ? "Saving..." : "Save password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
