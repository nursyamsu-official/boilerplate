"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useRef, useState } from "react"
import { useForm } from "@tanstack/react-form"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/sonner"
import { signIn } from "@/lib/auth-client"
import { AuthFormAlert } from "@/features/auth/components/AuthFormAlert"
import { AuthPageShell } from "@/features/auth/components/AuthPageShell"
import { AuthTextField } from "@/features/auth/components/AuthTextField"
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton"
import { assertAuthClientSuccess } from "@/features/auth/lib/auth-client-result"
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
  const submitLockRef = useRef(false)
  const googlePendingRef = useRef(false)

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

      try {
        await toast.promise(
          (async () => {
            await assertAuthClientSuccess(
              signIn.email({
                email: value.email,
                password: value.password,
                callbackURL: getRedirectUrl(authRoutes.dashboard),
              })
            )

            router.push(authRoutes.dashboard)
            router.refresh()
          })(),
          {
            loading: "Signing in...",
            success: "Signed in successfully",
            error: "Failed to sign in",
          }
        )
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error))
      }
    },
  })

  const isPending = form.state.isSubmitting || isGooglePending

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitLockRef.current || googlePendingRef.current || form.state.isSubmitting) {
      return
    }

    submitLockRef.current = true

    try {
      await form.handleSubmit()
    } finally {
      submitLockRef.current = false
    }
  }

  const handleGoogleSignIn = async () => {
    if (submitLockRef.current || googlePendingRef.current || form.state.isSubmitting) {
      return
    }

    setErrorMessage(null)

    try {
      googlePendingRef.current = true
      setIsGooglePending(true)

      await toast.promise(
        assertAuthClientSuccess(
          signIn.social({
            provider: "google",
            callbackURL: getRedirectUrl(authRoutes.dashboard),
          })
        ),
        {
          loading: "Signing in...",
          success: "Signed in successfully",
          error: "Failed to sign in",
        }
      )
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error))
    } finally {
      googlePendingRef.current = false
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

        <GoogleSignInButton isPending={isGooglePending} disabled={isPending} onClick={handleGoogleSignIn} />


        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs/relaxed text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <form className="space-y-4" aria-busy={isPending} onSubmit={(event) => void handleFormSubmit(event)}>
          <form.Field name="email">
            {(field) => (
              <AuthTextField
                id={field.name}
                label="Email"
                type="email"
                autoComplete="email"
                disabled={isPending}
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
                disabled={isPending}
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

          <Button type="submit" className="w-full" disabled={!form.state.canSubmit || isPending}>
            {form.state.isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            {form.state.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </AuthPageShell>
  )
}
