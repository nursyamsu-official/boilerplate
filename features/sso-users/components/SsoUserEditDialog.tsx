"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SsoProviderOption } from "@/features/sso-providers";
import type { UserOption } from "@/features/users";

import { ssoUserUpdateAction } from "../actions/sso-user-update.action";
import { mapFormValuesToSsoUserUpdateInput } from "../lib/sso-user-form-mapper";
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
  const handleSubmit = async (values: SsoUserFormValues) => {
    if (!linkId) return;

    await toast.promise(
      ssoUserUpdateAction(
        mapFormValuesToSsoUserUpdateInput(linkId, values),
      ).then(() => {
        onOpenChange(false);
        onSuccess();
      }),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
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
