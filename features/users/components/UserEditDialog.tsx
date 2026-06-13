"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RoleOption } from "@/features/roles";

import { userUpdateAction } from "../actions/user-update.action";
import { mapFormValuesToUserUpdateInput } from "../lib/user-form-mapper";
import type { UserFormValues } from "../types/user.type";
import { UserForm } from "./UserForm";

type UserEditDialogProps = {
  open: boolean;
  userId: string | null;
  defaultValues: UserFormValues | null;
  roleOptions: RoleOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function UserEditDialog({
  open,
  userId,
  defaultValues,
  roleOptions,
  onOpenChange,
  onSuccess,
}: UserEditDialogProps) {
  const handleSubmit = async (values: UserFormValues) => {
    if (!userId) return;

    await toast.promise(
      userUpdateAction(mapFormValuesToUserUpdateInput(userId, values)).then(
        () => {
          onOpenChange(false);
          onSuccess();
        },
      ),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Update user profile and role assignments.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && userId ? (
          <UserForm
            key={userId}
            defaultValues={defaultValues}
            roleOptions={roleOptions}
            mode="edit"
            submitLabel="Update"
            pendingLabel="Updating..."
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Loading form...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
