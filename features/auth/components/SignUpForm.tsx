"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/sonner"
import { signIn, signUp } from "@/lib/auth-client"
import { signUpSchema } from "@/features/auth/schemas/auth.schema"

type SignUpFieldErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function SignUpForm() {
  const router = useRouter()
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({})

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const parsedValue = signUpSchema.safeParse(value)

      if (!parsedValue.success) {
        const errors = parsedValue.error.flatten().fieldErrors
        setFieldErrors({
          name: errors.name?.[0],
          email: errors.email?.[0],
          password: errors.password?.[0],
          confirmPassword: errors.confirmPassword?.[0],
        })
        throw new Error("Please check your form")
      }

      setFieldErrors({})

      await toast.promise(
        (async () => {
          const result = await signUp.email({
            name: parsedValue.data.name,
            email: parsedValue.data.email,
            password: parsedValue.data.password,
            callbackURL: "/dashboard",
          })

          if (result.error) {
            throw new Error("Failed to register")
          }

          router.push("/check-email")
          router.refresh()
        })(),
        {
          loading: "Creating account...",
          success: "Registration successful",
          error: "Failed to save",
        }
      )
    },
  })

  const handleGoogleSignUp = async () => {
    await toast.promise(
      (async () => {
        const result = await signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        })

        if (result?.error) {
          throw new Error("Failed to sign up with Google")
        }
      })(),
      {
        loading: "Signing in...",
        success: "Registration successful",
        error: "Failed to save",
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
        <form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    if (fieldErrors.name) {
                      setFieldErrors((previous) => ({ ...previous, name: undefined }))
                    }
                    field.handleChange(event.target.value)
                  }}
                  placeholder="Your full name"
                />
                <FieldError>{fieldErrors.name}</FieldError>
              </FieldContent>
            </Field>
          )}
        </form.Field>

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

        <form.Field name="confirmPassword">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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

      <div className="flex justify-end">
        <Link className="text-xs text-muted-foreground hover:underline" href="/sign-in">
          Already have an account?
        </Link>
      </div>

      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
        )}
      </form.Subscribe>

      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => {
          void handleGoogleSignUp()
        }}
      >
        Continue with Google
      </Button>
    </form>
  )
}
