"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type VerifyState = "loading" | "success" | "error";

export function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const initialState: VerifyState = token ? "loading" : "error";
  const [state, setState] = useState<VerifyState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    token ? null : "Token is invalid or expired.",
  );

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      const { error } = await authClient.verifyEmail({ query: { token } });

      if (error) {
        setState("error");
        setErrorMessage("Token is invalid or expired.");
        return;
      }

      setState("success");
      setTimeout(() => {
        router.push("/auth/verify-success");
      }, 1500);
    };

    verifyToken();
  }, [token, router]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full">
          {state === "loading" && (
            <Loader2 className="size-5 animate-spin text-primary" />
          )}
          {state === "success" && (
            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
          )}
          {state === "error" && (
            <XCircle className="size-5 text-destructive" />
          )}
        </div>
        <CardTitle className="text-lg">
          {state === "loading" && "Verifying your email..."}
          {state === "success" && "Email verified!"}
          {state === "error" && "Verification failed"}
        </CardTitle>
        <CardDescription>
          {state === "loading" && "Please wait while we verify your email address."}
          {state === "success" && "Your email has been verified. Redirecting..."}
          {state === "error" && errorMessage}
        </CardDescription>
      </CardHeader>
      {state === "error" && (
        <CardContent className="flex flex-col items-center gap-2">
          <a
            href="/auth/verify-email-info"
            className="text-xs text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Request a new verification email
          </a>
          <a
            href="/auth/sign-in"
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-muted-foreground/80"
          >
            Back to Sign In
          </a>
        </CardContent>
      )}
    </Card>
  );
}
