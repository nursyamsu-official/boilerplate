"use client";

import { useState } from "react";
import { changePassword } from "@/lib/auth-client";
import { changePasswordSchema, type ChangePasswordInput } from "@/features/auth/schemas/change-password.schema";
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

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ChangePasswordInput, string>>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const values = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmNewPassword: formData.get("confirmNewPassword") as string,
    };

    const result = changePasswordSchema.safeParse(values);
    if (!result.success) {
      const errors: Partial<Record<keyof ChangePasswordInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ChangePasswordInput;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    const { error: authError } = await changePassword({
      currentPassword: result.data.currentPassword,
      newPassword: result.data.newPassword,
    });

    setIsLoading(false);

    if (authError) {
      setError("Invalid current password.");
      return;
    }

    setSuccess("Your password has been changed successfully.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Change Password</CardTitle>
        <CardDescription>Update your account password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.currentPassword}
              disabled={isLoading}
            />
            {fieldErrors.currentPassword && (
              <p className="text-xs text-destructive">{fieldErrors.currentPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.newPassword}
              disabled={isLoading}
            />
            {fieldErrors.newPassword && (
              <p className="text-xs text-destructive">{fieldErrors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.confirmNewPassword}
              disabled={isLoading}
            />
            {fieldErrors.confirmNewPassword && (
              <p className="text-xs text-destructive">{fieldErrors.confirmNewPassword}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="mt-1 w-full" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
