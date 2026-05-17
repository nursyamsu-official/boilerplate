"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type VerifyState = "loading" | "success" | "error";

type VerifyApiResponse =
  | { ok: true }
  | { ok: false; message?: string };

type VerifyOutcome =
  | { success: true }
  | { success: false; message: string };

const verifyPromises = new Map<string, Promise<VerifyOutcome>>();

function getVerifyOutcome(token: string): Promise<VerifyOutcome> {
  const existing = verifyPromises.get(token);
  if (existing) {
    return existing;
  }

  const p: Promise<VerifyOutcome> = (async () => {
    let res: Response;
    try {
      res = await fetch("/api/change-email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "same-origin",
      });
    } catch {
      return { success: false, message: "Failed to connect. Please try again." };
    }

    let data: VerifyApiResponse;
    try {
      data = (await res.json()) as VerifyApiResponse;
    } catch {
      return { success: false, message: "Invalid response from server" };
    }

    if (res.ok && "ok" in data && data.ok) {
      return { success: true };
    }
    if ("message" in data && typeof data.message === "string") {
      return { success: false, message: data.message };
    }
    return { success: false, message: "Verification failed" };
  })();

  verifyPromises.set(token, p);
  return p;
}

export function VerifyEmailChange() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const initialState: VerifyState = token ? "loading" : "error";
  const [state, setState] = useState<VerifyState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    token ? null : "Missing verification token.",
  );

  useEffect(() => {
    if (!token) return;

    const run = async () => {
      const outcome = await getVerifyOutcome(token);
      if (outcome.success) {
        setState("success");
        void signOut().catch(() => {
          // Session was already removed server-side; sign-out is best-effort
        });
        return;
      }
      setState("error");
      setErrorMessage(outcome.message);
    };

    void run();
  }, [token]);

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
          {state === "loading" && "Verifying your new email..."}
          {state === "success" && "Email updated successfully!"}
          {state === "error" && "Verification failed"}
        </CardTitle>
        <CardDescription>
          {state === "loading" &&
            "Please wait while we verify your new email address."}
          {state === "success" &&
            "Your email has been updated. Please log in again with your new email."}
          {state === "error" && errorMessage}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        {state === "success" && (
          <a
            href="/auth/sign-in"
            className="text-xs text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Go to Sign In
          </a>
        )}
        {state === "error" && (
          <a
            href="/auth/sign-in"
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-muted-foreground/80"
          >
            Back to Sign In
          </a>
        )}
      </CardContent>
    </Card>
  );
}
