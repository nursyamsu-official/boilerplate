"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSession,
  updateUser,
  changeEmail,
  deleteUser,
} from "@/lib/auth-client";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ProfileTab() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name ?? "");
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsUpdatingName(true);
    toast.promise(
      updateUser({ name: trimmed }).then((res) => {
        if (res.error)
          throw new Error(res.error.message ?? "Failed to update profile");
      }),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to update profile",
      },
    );
    setIsUpdatingName(false);
  };

  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = newEmail.trim();
    if (!trimmed) return;

    setIsUpdatingEmail(true);
    toast.promise(
      changeEmail({
        newEmail: trimmed,
        callbackURL: "/dashboard/settings",
      }).then((res) => {
        if (res.error)
          throw new Error(res.error.message ?? "Failed to update email");
        setNewEmail("");
      }),
      {
        loading: "Updating...",
        success: "Verification email sent to your new address",
        error: "Failed to update email",
      },
    );
    setIsUpdatingEmail(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    toast.promise(
      deleteUser({
        callbackURL: "/auth/sign-in",
      }).then((res) => {
        if (res.error)
          throw new Error(res.error.message ?? "Failed to delete account");
        router.push("/auth/sign-in");
      }),
      {
        loading: "Deleting...",
        success: "Account deleted",
        error: "Failed to delete account",
      },
    );
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Update your Name</CardTitle>
          <CardDescription>
            Update your name to be displayed on your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateName} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={isUpdatingName}
              />
            </div>
            <div>
              <Button type="submit" disabled={isUpdatingName || !name.trim()}>
                {isUpdatingName ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update your Email</CardTitle>
          <CardDescription>
            Update your email address you use to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEmail} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentEmail">Current Email</Label>
              <Input
                id="currentEmail"
                value={session?.user?.email ?? ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="newEmail">New Email</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                disabled={isUpdatingEmail}
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={isUpdatingEmail || !newEmail.trim()}
              >
                {isUpdatingEmail ? "Updating..." : "Update Email Address"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            This section contains actions that are{" "}
            <span className="font-semibold italic">irreversible</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium">Delete your Account</p>
            <p className="text-sm text-muted-foreground">
              This will delete your account and the accounts you own. This
              action cannot be undone.
            </p>
          </div>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete your Account"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove all of your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
