"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { requestPasswordReset } from "@/lib/auth-client"
import { useAuthRedirectUrl } from "@/features/auth/hooks/use-auth-redirect-url"
import { AuthFormAlert } from "@/features/auth/components/AuthFormAlert"
import { AuthPageShell } from "@/features/auth/components/AuthPageShell"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error"
import { getFieldErrorMessages } from "@/features/auth/lib/form-error"
import { authRoutes } from "@/features/auth/lib/auth-routes"
import { forgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema"

export function ForgotPasswordForm() {
  const getRedirectUrl = useAuthRedirectUrl()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null)
      setSuccessMessage(null)

      const { error } = await requestPasswordReset({
        email: value.email,
        redirectTo: getRedirectUrl(authRoutes.resetPassword),
      })

      if (error) {
        setErrorMessage(getAuthErrorMessage(error))
        return
      }

      setSuccessMessage(
        "If the email exists, a password reset link has been sent to the inbox."
      )
    },
  })

  return (
    <AuthPageShell
      title="Forgot password"
      description="Enter your email and we will send a password reset link."
      footer={
        <p className="w-full text-center text-xs/relaxed text-muted-foreground">
          Remembered your password?{" "}
          <Link href={authRoutes.signIn} className="text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {errorMessage ? (
          <AuthFormAlert
            title="Unable to send reset link"
            description={errorMessage}
            variant="destructive"
          />
        ) : null}

        {successMessage ? (
          <AuthFormAlert title="Check your email" description={successMessage} />
        ) : null}

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit()
          }}
        >
          <form.Field name="email">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Email"
                type="email"
                autoComplete="email"
                value={field.state.value}
                invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                errors={getFieldErrorMessages(field.state.meta.errors)}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

          <Button type="submit" className="w-full" disabled={!form.state.canSubmit || form.state.isSubmitting}>
            {form.state.isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Send reset link
          </Button>
        </form>
      </div>
    </AuthPageShell>
  )
}
