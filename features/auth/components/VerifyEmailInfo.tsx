"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendVerificationEmail } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

export function VerifyEmailInfo() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailFromUrl);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setIsResending(true);
    setMessage(null);
    setError(null);

    const { error: resendError } = await sendVerificationEmail({
      email: email.trim(),
      callbackURL: "/auth/verify-email",
    });

    setIsResending(false);

    if (resendError) {
      setError("Failed to resend verification email. Please try again.");
      return;
    }

    setMessage("Verification email has been resent. Please check your inbox.");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-5 text-primary" />
        </div>
        <CardTitle className="text-lg">Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification link to your email address. Please click the link to
          verify your account. If you already have an account, sign in instead.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {message && (
          <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}

        {!emailFromUrl && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="resend-email">Email</Label>
            <Input
              id="resend-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isResending}
            />
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Didn&apos;t receive the email? Check your spam folder or click below to resend.
        </p>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          disabled={isResending || !email.trim()}
          onClick={handleResend}
        >
          {isResending ? "Resending..." : "Resend Verification Email"}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-1">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Sign in instead
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
