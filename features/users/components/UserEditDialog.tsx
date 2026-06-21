"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RoleOption } from "@/features/roles";

import { userUpdateAction } from "../actions/user-update.action";
import { mapFormValuesToUserUpdateInput } from "../lib/user-form-mapper";
import { userFormFieldsSchema } from "../schemas/user-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: userFormFieldsSchema,
              action: userUpdateAction,
              mapInput: (values) =>
                mapFormValuesToUserUpdateInput(userId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: () => {
                onOpenChange(false);
                onSuccess();
              },
            }}
          />
        ) : (
          <FormDialogSkeleton fields={7} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
