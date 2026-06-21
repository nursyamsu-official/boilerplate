"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RoleOption } from "@/features/roles";

import { userCreateAction } from "../actions/user-create.action";
import { defaultUserCreateFormValues } from "../lib/user-form-defaults";
import { mapFormValuesToUserCreateInput } from "../lib/user-form-mapper";
import { userCreateFormFieldsSchema } from "../schemas/user-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
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
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: userCreateFormFieldsSchema,
            action: userCreateAction,
            mapInput: mapFormValuesToUserCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: () => {
              onOpenChange(false);
              onSuccess();
            },
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
