"use client"

import { useState } from "react"
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
import { changePassword } from "@/lib/auth-client"
import { AuthFormAlert } from "@/features/auth/components/AuthFormAlert"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error"
import { getFieldErrorMessages } from "@/features/auth/lib/form-error"
import { changePasswordSchema } from "@/features/auth/schemas/change-password.schema"

export function ChangePasswordForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
      setErrorMessage(null)
      setSuccessMessage(null)

      const { error } = await changePassword({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
        revokeOtherSessions: value.revokeOtherSessions,
      })

      if (error) {
        setErrorMessage(getAuthErrorMessage(error))
        return
      }

      setSuccessMessage("Your password has been updated successfully.")
    },
  })

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Update your password and optionally sign out other active sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {errorMessage ? (
          <AuthFormAlert
            title="Unable to change password"
            description={errorMessage}
            variant="destructive"
          />
        ) : null}

        {successMessage ? (
          <AuthFormAlert title="Password updated" description={successMessage} />
        ) : null}

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit()
          }}
        >
          <form.Field name="currentPassword">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Current password"
                type="password"
                autoComplete="current-password"
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

          <Button type="submit" disabled={!form.state.canSubmit || form.state.isSubmitting}>
            {form.state.isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Save password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
