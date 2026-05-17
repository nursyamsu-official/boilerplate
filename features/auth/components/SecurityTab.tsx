"use client";

import { useEffect, useState } from "react";
import {
  useSession,
  changePassword,
  requestPasswordReset,
  listAccounts,
  unlinkAccount,
  linkSocial,
} from "@/lib/auth-client";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/features/auth/schemas/change-password.schema";
import { TwoFactorSettings } from "./TwoFactorSettings";
import { toast } from "sonner";
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
import { Eye, EyeOff } from "lucide-react";

type Account = {
  id: string;
  providerId: string;
  accountId?: string;
};

function PasswordVisibilityInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled,
  "aria-invalid": ariaInvalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
      >
        {visible ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}

function UpdatePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ChangePasswordInput, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const values = { currentPassword, newPassword, confirmNewPassword };
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
    toast.promise(
      changePassword({
        currentPassword: result.data.currentPassword,
        newPassword: result.data.newPassword,
      }).then((res) => {
        if (res.error) throw new Error("Invalid current password");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }),
      {
        loading: "Updating...",
        success: "Password updated successfully",
        error: "Failed to update password",
      },
    );
    setIsLoading(false);
  };

  const minLength = 8;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPassword">Current password</Label>
            <PasswordVisibilityInput
              id="currentPassword"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Enter your current password"
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={!!fieldErrors.currentPassword}
            />
            {fieldErrors.currentPassword && (
              <p className="text-xs text-destructive">
                {fieldErrors.currentPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <PasswordVisibilityInput
              id="newPassword"
              value={newPassword}
              onChange={setNewPassword}
              placeholder={`At least ${minLength} characters`}
              autoComplete="new-password"
              disabled={isLoading}
              aria-invalid={!!fieldErrors.newPassword}
            />
            <p className="text-xs text-muted-foreground">
              {minLength} or more characters
            </p>
            {fieldErrors.newPassword && (
              <p className="text-xs text-destructive">
                {fieldErrors.newPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <PasswordVisibilityInput
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={setConfirmNewPassword}
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              disabled={isLoading}
              aria-invalid={!!fieldErrors.confirmNewPassword}
            />
            <p className="text-xs text-muted-foreground">
              {minLength} or more characters
            </p>
            {fieldErrors.confirmNewPassword && (
              <p className="text-xs text-destructive">
                {fieldErrors.confirmNewPassword}
              </p>
            )}
          </div>

          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SetPasswordCard() {
  const { data: session } = useSession();
  const [isSending, setIsSending] = useState(false);

  const handleSetPassword = async () => {
    if (!session?.user?.email) return;
    setIsSending(true);
    toast.promise(
      requestPasswordReset({
        email: session.user.email,
        redirectTo: "/auth/reset-password",
      }).then((res) => {
        if (res.error)
          throw new Error(res.error.message ?? "Failed to send email");
      }),
      {
        loading: "Sending...",
        success: "Password reset email sent",
        error: "Failed to send reset email",
      },
    );
    setIsSending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Password</CardTitle>
        <CardDescription>
          You have not set a password yet. To set one, you need to go through
          the password reset flow. Click the button below to send an email to
          reset your password and follow the instructions in the email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          onClick={handleSetPassword}
          disabled={isSending}
          className="cursor-pointer"
        >
          {isSending ? "Sending..." : "Set password"}
        </Button>
      </CardContent>
    </Card>
  );
}

function ConnectedAccountsSection({ accounts }: { accounts: Account[] }) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const googleAccount = accounts.find((a) => a.providerId === "google");

  const handleDisconnect = async (providerId: string) => {
    setIsLoading(providerId);
    toast.promise(
      unlinkAccount({ providerId }).then((res) => {
        if (res.error)
          throw new Error(res.error.message ?? "Failed to disconnect");
      }),
      {
        loading: "Disconnecting...",
        success: "Disconnected successfully",
        error: "Failed to disconnect account",
      },
    );
    setIsLoading(null);
  };

  const handleConnect = async (provider: "google") => {
    setIsLoading(provider);
    await linkSocial({
      provider,
      callbackURL: "/dashboard/settings?tab=security",
    });
    setIsLoading(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected accounts</CardTitle>
        <CardDescription>
          Sign in faster by linking it to Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium">Google</span>
          </div>
          {googleAccount ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDisconnect("google")}
              disabled={isLoading === "google"}
            >
              {isLoading === "google" ? "Disconnecting..." : "Disconnect"}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConnect("google")}
              disabled={isLoading === "google"}
              className="cursor-pointer"
            >
              {isLoading === "google" ? "Connecting..." : "Connect"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function SecurityTab() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  useEffect(() => {
    listAccounts().then((res) => {
      if (res.data) {
        setAccounts(res.data as unknown as Account[]);
      }
      setIsLoadingAccounts(false);
    });
  }, []);

  const hasCredentialAccount = accounts.some(
    (a) => a.providerId === "credential",
  );

  if (isLoadingAccounts) {
    return (
      <div className="flex flex-col gap-6 pt-4">
        <div className="h-48 animate-pulse rounded-lg border bg-muted" />
        <div className="h-48 animate-pulse rounded-lg border bg-muted" />
        <div className="h-32 animate-pulse rounded-lg border bg-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      {hasCredentialAccount ? <UpdatePasswordForm /> : <SetPasswordCard />}

      <TwoFactorSettings />

      <ConnectedAccountsSection accounts={accounts} />
    </div>
  );
}
