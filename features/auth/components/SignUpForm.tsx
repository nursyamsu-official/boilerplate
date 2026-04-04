"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signIn, signUp } from "@/lib/auth-client"
import { useAuthRedirectUrl } from "@/features/auth/hooks/use-auth-redirect-url"
import { AuthFormAlert } from "@/features/auth/components/AuthFormAlert"
import { AuthPageShell } from "@/features/auth/components/AuthPageShell"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton"
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error"
import { getFieldErrorMessages } from "@/features/auth/lib/form-error"
import { authRoutes } from "@/features/auth/lib/auth-routes"
import { signUpSchema } from "@/features/auth/schemas/sign-up.schema"

export function SignUpForm() {
  const getRedirectUrl = useAuthRedirectUrl()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isGooglePending, setIsGooglePending] = useState(false)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null)
      setSuccessMessage(null)

      const { error } = await signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
        callbackURL: getRedirectUrl(authRoutes.dashboard),
      })

      if (error) {
        setErrorMessage(getAuthErrorMessage(error))
        return
      }

      setSuccessMessage(
        "Your account has been created. Check your inbox to verify your email before signing in."
      )
    },
  })

  const handleGoogleSignIn = async () => {
    try {
      setIsGooglePending(true)
      setErrorMessage(null)

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: getRedirectUrl(authRoutes.dashboard),
      })

      if (error) {
        setErrorMessage(getAuthErrorMessage(error))
      }
    } finally {
      setIsGooglePending(false)
    }
  }

  return (
    <AuthPageShell
      title="Create your account"
      description="Register with email verification or continue with Google."
      footer={
        <p className="w-full text-center text-xs/relaxed text-muted-foreground">
          Already have an account?{" "}
          <Link href={authRoutes.signIn} className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {errorMessage ? (
          <AuthFormAlert
            title="Unable to create your account"
            description={errorMessage}
            variant="destructive"
          />
        ) : null}

        {successMessage ? (
          <AuthFormAlert title="Check your email" description={successMessage} />
        ) : null}

        <GoogleSignInButton isPending={isGooglePending} onClick={handleGoogleSignIn} />

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs/relaxed text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit()
          }}
        >
          <form.Field name="name">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Full name"
                autoComplete="name"
                value={field.state.value}
                invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                errors={getFieldErrorMessages(field.state.meta.errors)}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

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

          <form.Field name="password">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Password"
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
                label="Confirm password"
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

          <Button type="submit" className="w-full" disabled={!form.state.canSubmit || form.state.isSubmitting}>
            {form.state.isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Create account
          </Button>
        </form>
      </div>
    </AuthPageShell>
  )
}
