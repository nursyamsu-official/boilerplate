"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "@/features/auth/schemas/sign-in.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignInInput, string>>>({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe,
    };

    const result = signInSchema.safeParse(values);
    if (!result.success) {
      const errors: Partial<Record<keyof SignInInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SignInInput;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    const { error: authError } = await signIn.email(
      {
        email: result.data.email,
        password: result.data.password,
        rememberMe: result.data.rememberMe,
      },
      {
        onSuccess(context) {
          if (context.data.twoFactorRedirect) {
            router.push("/auth/two-factor");
            return;
          }
          router.push("/dashboard");
        },
      },
    );

    if (authError) {
      setIsLoading(false);
      if (authError.status === 403) {
        setError("Your account is not yet verified. Please check your email to activate.");
      } else {
        setError("Invalid email or password.");
      }
      return;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              disabled={isLoading}
            />
            {fieldErrors.email && (
              <p className="text-xs text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.password}
              disabled={isLoading}
            />
            {fieldErrors.password && (
              <p className="text-xs text-destructive">{fieldErrors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="cursor-pointer font-normal">
                Remember me
              </Label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" size="lg" className="mt-1 w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <GoogleSignInButton />
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary underline underline-offset-4 hover:text-primary/80">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
