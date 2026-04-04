"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { resetPassword } from "@/lib/auth-client"
import { AuthFormAlert } from "@/features/auth/components/AuthFormAlert"
import { AuthPageShell } from "@/features/auth/components/AuthPageShell"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error"
import { getFieldErrorMessages } from "@/features/auth/lib/form-error"
import { authRoutes } from "@/features/auth/lib/auth-routes"
import { resetPasswordSchema } from "@/features/auth/schemas/reset-password.schema"

type ResetPasswordFormProps = {
  token?: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      if (!token) {
        setErrorMessage("This reset link is invalid or has expired.")
        return
      }

      setErrorMessage(null)
      setSuccessMessage(null)

      const { error } = await resetPassword({
        newPassword: value.password,
        token,
      })

      if (error) {
        setErrorMessage(getAuthErrorMessage(error))
        return
      }

      setSuccessMessage("Your password has been updated. You can now sign in with your new password.")
    },
  })

  return (
    <AuthPageShell
      title="Reset password"
      description="Choose a new password for your account."
      footer={
        <p className="w-full text-center text-xs/relaxed text-muted-foreground">
          Back to{" "}
          <Link href={authRoutes.signIn} className="text-primary underline-offset-4 hover:underline">
            sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {!token ? (
          <AuthFormAlert
            title="Invalid reset link"
            description="Open the latest password reset email and try the link again."
            variant="destructive"
          />
        ) : null}

        {errorMessage ? (
          <AuthFormAlert
            title="Unable to reset password"
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
          <form.Field name="password">
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

          <Button
            type="submit"
            className="w-full"
            disabled={!token || !form.state.canSubmit || form.state.isSubmitting}
          >
            {form.state.isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Save new password
          </Button>
        </form>
      </div>
    </AuthPageShell>
  )
}
