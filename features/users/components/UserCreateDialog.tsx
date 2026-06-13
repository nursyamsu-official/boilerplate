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

import { userCreateAction } from "../actions/user-create.action";
import { defaultUserCreateFormValues } from "../lib/user-form-defaults";
import { mapFormValuesToUserCreateInput } from "../lib/user-form-mapper";
import type { UserFormValues } from "../types/user.type";
import { UserForm } from "./UserForm";

type UserCreateDialogProps = {
  open: boolean;
  roleOptions: RoleOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function UserCreateDialog({
  open,
  roleOptions,
  onOpenChange,
  onSuccess,
}: UserCreateDialogProps) {
  const handleSubmit = async (values: UserFormValues) => {
    await toast.promise(
      userCreateAction(mapFormValuesToUserCreateInput(values)).then(() => {
        onOpenChange(false);
        onSuccess();
      }),
      {
        loading: "Creating...",
        success: "Created successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>
            Add a new user account and assign roles.
          </DialogDescription>
        </DialogHeader>

        <UserForm
          defaultValues={defaultUserCreateFormValues}
          roleOptions={roleOptions}
          mode="create"
          submitLabel="Create"
          pendingLabel="Creating..."
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
