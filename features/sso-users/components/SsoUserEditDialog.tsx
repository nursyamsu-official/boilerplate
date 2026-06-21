"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SsoProviderOption } from "@/features/sso-providers";
import type { UserOption } from "@/features/users";

import { ssoUserUpdateAction } from "../actions/sso-user-update.action";
import { mapFormValuesToSsoUserUpdateInput } from "../lib/sso-user-form-mapper";
import { ssoUserFormFieldsSchema } from "../schemas/sso-user-create.schema";
import type { SsoUserFormValues } from "../types/sso-user.type";
import { SsoUserForm } from "./SsoUserForm";

type SsoUserEditDialogProps = {
  open: boolean;
  linkId: string | null;
  defaultValues: SsoUserFormValues | null;
  userOptions: UserOption[];
  providerOptions: SsoProviderOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function SsoUserEditDialog({
  open,
  linkId,
  defaultValues,
  userOptions,
  providerOptions,
  onOpenChange,
  onSuccess,
}: SsoUserEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit SSO user link</DialogTitle>
          <DialogDescription>
            Update the mapping between a local user and SSO identity.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && linkId ? (
          <SsoUserForm
            key={linkId}
            defaultValues={defaultValues}
            userOptions={userOptions}
            providerOptions={providerOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: ssoUserFormFieldsSchema,
              action: ssoUserUpdateAction,
              mapInput: (values) =>
                mapFormValuesToSsoUserUpdateInput(linkId, values),
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
          <FormDialogSkeleton fields={5} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
