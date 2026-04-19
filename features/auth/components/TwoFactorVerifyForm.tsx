"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { twoFactor } from "@/lib/auth-client";
import { otpSchema, backupCodeSchema } from "@/features/auth/schemas/two-factor.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const RESEND_COOLDOWN_SECONDS = 60;

export function TwoFactorVerifyForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"otp" | "backup">("otp");
  const [code, setCode] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const sendOtp = useCallback(async () => {
    setIsSending(true);
    setError(null);
    const { error: sendError } = await twoFactor.sendOtp();
    setIsSending(false);

    if (sendError) {
      setError("Failed to send verification code. Please try again.");
      return;
    }

    setCooldown(RESEND_COOLDOWN_SECONDS);
  }, []);

  useEffect(() => {
    sendOtp();
  }, [sendOtp]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerifyOtp = async () => {
    setError(null);

    const result = otpSchema.safeParse({ code });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    const { error: verifyError } = await twoFactor.verifyOtp({
      code: result.data.code,
      trustDevice: true,
    });
    setIsLoading(false);

    if (verifyError) {
      setError("Invalid or expired code. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  const handleVerifyBackup = async () => {
    setError(null);

    const result = backupCodeSchema.safeParse({ code: backupCode });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    const { error: verifyError } = await twoFactor.verifyBackupCode({
      code: result.data.code,
      trustDevice: true,
    });
    setIsLoading(false);

    if (verifyError) {
      setError("Invalid backup code. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
        <CardDescription>
          {mode === "otp"
            ? "Enter the verification code sent to your email"
            : "Enter one of your backup codes"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          {mode === "otp" ? (
            <>
              <div className="flex flex-col items-center gap-3">
                <Label htmlFor="otp-input" className="sr-only">
                  Verification code
                </Label>
                <InputOTP
                  id="otp-input"
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleVerifyOtp}
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 disabled:opacity-50 disabled:no-underline"
                  onClick={sendOtp}
                  disabled={cooldown > 0 || isSending}
                >
                  {isSending
                    ? "Sending..."
                    : cooldown > 0
                      ? `Resend code (${cooldown}s)`
                      : "Resend code"}
                </button>
                <button
                  type="button"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  onClick={() => {
                    setMode("backup");
                    setError(null);
                  }}
                >
                  Use backup code
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="backupCode">Backup Code</Label>
                <Input
                  id="backupCode"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value)}
                  placeholder="Enter your backup code"
                  disabled={isLoading}
                />
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleVerifyBackup}
                disabled={isLoading || !backupCode.trim()}
              >
                {isLoading ? "Verifying..." : "Verify Backup Code"}
              </Button>

              <button
                type="button"
                className="flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                onClick={() => {
                  setMode("otp");
                  setError(null);
                }}
              >
                <ArrowLeft className="h-3 w-3" />
                Back to email code
              </button>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href="/auth/sign-in"
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
