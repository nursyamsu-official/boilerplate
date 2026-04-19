"use client";

import { useState } from "react";
import { twoFactor, useSession } from "@/lib/auth-client";
import { twoFactorPasswordSchema } from "@/features/auth/schemas/two-factor.schema";
import { BackupCodesDisplay } from "./BackupCodesDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, ShieldOff } from "lucide-react";

type View = "status" | "enable" | "disable" | "backup-codes" | "regenerate";

export function TwoFactorSettings() {
  const { data: session, isPending: isSessionLoading } = useSession();
  const [view, setView] = useState<View>("status");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const twoFactorEnabled = session?.user?.twoFactorEnabled ?? false;

  const resetState = () => {
    setPassword("");
    setError(null);
    setSuccess(null);
  };

  const handleEnable = async () => {
    setError(null);

    const result = twoFactorPasswordSchema.safeParse({ password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    const { data, error: enableError } = await twoFactor.enable({
      password: result.data.password,
    });
    setIsLoading(false);

    if (enableError) {
      setError("Failed to enable 2FA. Please check your password and try again.");
      return;
    }

    if (data?.backupCodes) {
      setBackupCodes(data.backupCodes);
      setView("backup-codes");
      setPassword("");
    } else {
      setSuccess("Two-factor authentication has been enabled.");
      setView("status");
      setPassword("");
    }
  };

  const handleDisable = async () => {
    setError(null);

    const result = twoFactorPasswordSchema.safeParse({ password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    const { error: disableError } = await twoFactor.disable({
      password: result.data.password,
    });
    setIsLoading(false);

    if (disableError) {
      setError("Failed to disable 2FA. Please check your password and try again.");
      return;
    }

    setSuccess("Two-factor authentication has been disabled.");
    setView("status");
    setPassword("");
  };

  const handleRegenerateBackupCodes = async () => {
    setError(null);

    const result = twoFactorPasswordSchema.safeParse({ password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    const { data, error: regenError } = await twoFactor.generateBackupCodes({
      password: result.data.password,
    });
    setIsLoading(false);

    if (regenError || !data?.backupCodes) {
      setError("Failed to generate backup codes. Please check your password and try again.");
      return;
    }

    setBackupCodes(data.backupCodes);
    setView("backup-codes");
    setPassword("");
  };

  if (isSessionLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400">
              {success}
            </div>
          )}

          {view === "status" && (
            <>
              <div className="flex items-center gap-3 rounded-md border p-3">
                {twoFactorEnabled ? (
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                ) : (
                  <ShieldOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium">
                    {twoFactorEnabled ? "2FA is enabled" : "2FA is disabled"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {twoFactorEnabled
                      ? "A verification code will be sent to your email on each sign-in"
                      : "Enable 2FA to add an extra layer of security"}
                  </p>
                </div>
              </div>

              {twoFactorEnabled ? (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetState();
                      setView("regenerate");
                    }}
                  >
                    Regenerate Backup Codes
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      resetState();
                      setView("disable");
                    }}
                  >
                    Disable 2FA
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    resetState();
                    setView("enable");
                  }}
                >
                  Enable 2FA
                </Button>
              )}
            </>
          )}

          {view === "enable" && (
            <>
              <p className="text-xs text-muted-foreground">
                Enter your password to enable two-factor authentication. A
                verification code will be sent to your email each time you sign
                in.
              </p>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="enable-password">Password</Label>
                <Input
                  id="enable-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    resetState();
                    setView("status");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleEnable}
                  disabled={isLoading || !password}
                >
                  {isLoading ? "Enabling..." : "Enable 2FA"}
                </Button>
              </div>
            </>
          )}

          {view === "disable" && (
            <>
              <p className="text-xs text-muted-foreground">
                Enter your password to disable two-factor authentication. This
                will remove the extra security layer from your account.
              </p>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="disable-password">Password</Label>
                <Input
                  id="disable-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    resetState();
                    setView("status");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDisable}
                  disabled={isLoading || !password}
                >
                  {isLoading ? "Disabling..." : "Disable 2FA"}
                </Button>
              </div>
            </>
          )}

          {view === "regenerate" && (
            <>
              <p className="text-xs text-muted-foreground">
                Enter your password to generate new backup codes. This will
                invalidate all previously generated codes.
              </p>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="regen-password">Password</Label>
                <Input
                  id="regen-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    resetState();
                    setView("status");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleRegenerateBackupCodes}
                  disabled={isLoading || !password}
                >
                  {isLoading ? "Generating..." : "Generate Codes"}
                </Button>
              </div>
            </>
          )}

          {view === "backup-codes" && (
            <>
              <p className="text-xs text-muted-foreground">
                Two-factor authentication is now enabled. Save your backup codes
                below — you will need them if you lose access to your email.
              </p>
              <BackupCodesDisplay codes={backupCodes} />
              <Button
                onClick={() => {
                  setBackupCodes([]);
                  setSuccess("Two-factor authentication has been enabled.");
                  setView("status");
                }}
              >
                Done
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
