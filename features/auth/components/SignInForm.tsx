"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signIn } from "@/lib/auth-client"
import { AuthFormAlert } from "@/features/auth/components/AuthFormAlert"
import { AuthPageShell } from "@/features/auth/components/AuthPageShell"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton"
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error"
import { getFieldErrorMessages } from "@/features/auth/lib/form-error"
import { authRoutes } from "@/features/auth/lib/auth-routes"
import { signInSchema } from "@/features/auth/schemas/sign-in.schema"
import { useAuthRedirectUrl } from "@/features/auth/hooks/use-auth-redirect-url"

export function SignInForm() {
  const router = useRouter()
  const getRedirectUrl = useAuthRedirectUrl()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isGooglePending, setIsGooglePending] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null)

      const { error } = await signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: getRedirectUrl(authRoutes.dashboard),
      })

      if (error) {
        setErrorMessage(getAuthErrorMessage(error))
        return
      }

      router.push(authRoutes.dashboard)
      router.refresh()
    },
  })

  const handleGoogleSignIn = async () => {
    try {
      setIsGooglePending(true)

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
      title="Sign in"
      description="Use your email and password or continue with Google."
      footer={
        <p className="w-full text-center text-xs/relaxed text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={authRoutes.signUp} className="text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {errorMessage ? (
          <AuthFormAlert
            title="Unable to sign in"
            description={errorMessage}
            variant="destructive"
          />
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
                autoComplete="current-password"
                value={field.state.value}
                invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                errors={getFieldErrorMessages(field.state.meta.errors)}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

          <div className="flex items-center justify-between gap-3">
            <Link
              href={authRoutes.forgotPassword}
              className="text-xs/relaxed text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={!form.state.canSubmit || form.state.isSubmitting}>
            {form.state.isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Sign in
          </Button>
        </form>
      </div>
    </AuthPageShell>
  )
}
