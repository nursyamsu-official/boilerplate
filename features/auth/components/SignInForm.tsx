"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/sonner"
import { signIn } from "@/lib/auth-client"
import { signInSchema } from "@/features/auth/schemas/auth.schema"

type SignInFieldErrors = {
  email?: string
  password?: string
}

export function SignInForm() {
  const router = useRouter()
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({})

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const parsedValue = signInSchema.safeParse(value)

      if (!parsedValue.success) {
        const errors = parsedValue.error.flatten().fieldErrors
        setFieldErrors({
          email: errors.email?.[0],
          password: errors.password?.[0],
        })
        throw new Error("Please check your form")
      }

      setFieldErrors({})

      const submitPromise = (async () => {
        const result = await signIn.email({
          email: parsedValue.data.email,
          password: parsedValue.data.password,
          callbackURL: "/dashboard",
        })

        if (result.error) {
          throw new Error("Failed to sign in")
        }

        router.push("/dashboard")
        router.refresh()
      })()

      toast.promise(submitPromise, {
        loading: "Signing in...",
        success: "Login successful",
        error: "Failed to sign in",
      })

      await submitPromise
    },
  })

  const handleGoogleSignIn = async () => {
    await toast.promise(
      (async () => {
        const result = await signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        })

        if (result?.error) {
          throw new Error("Failed to sign in with Google")
        }
      })(),
      {
        loading: "Signing in...",
        success: "Login successful",
        error: "Failed to sign in",
      }
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
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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

        <form.Field name="password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    if (fieldErrors.password) {
                      setFieldErrors((previous) => ({
                        ...previous,
                        password: undefined,
                      }))
                    }
                    field.handleChange(event.target.value)
                  }}
                  placeholder="********"
                />
                <FieldError>{fieldErrors.password}</FieldError>
              </FieldContent>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <div className="flex items-center justify-between">
        <Link className="text-xs text-primary hover:underline" href="/forgot-password">
          Forgot password?
        </Link>
        <Link className="text-xs text-muted-foreground hover:underline" href="/sign-up">
          Create account
        </Link>
      </div>

      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        )}
      </form.Subscribe>

      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => {
          void handleGoogleSignIn()
        }}
      >
        Continue with Google
      </Button>
    </form>
  )
}
