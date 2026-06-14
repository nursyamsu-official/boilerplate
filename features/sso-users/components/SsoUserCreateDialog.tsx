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

import { ssoUserCreateAction } from "../actions/sso-user-create.action";
import { defaultSsoUserFormValues } from "../lib/sso-user-form-defaults";
import { mapFormValuesToSsoUserCreateInput } from "../lib/sso-user-form-mapper";
import type { SsoUserFormValues } from "../types/sso-user.type";
import { SsoUserForm } from "./SsoUserForm";

type SsoUserCreateDialogProps = {
  open: boolean;
  userOptions: UserOption[];
  providerOptions: SsoProviderOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function SsoUserCreateDialog({
  open,
  userOptions,
  providerOptions,
  onOpenChange,
  onSuccess,
}: SsoUserCreateDialogProps) {
  const handleSubmit = async (values: SsoUserFormValues) => {
    await toast.promise(
      ssoUserCreateAction(mapFormValuesToSsoUserCreateInput(values)).then(() => {
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create SSO user link</DialogTitle>
          <DialogDescription>
            Link a local user to an external SSO identity.
          </DialogDescription>
        </DialogHeader>

        <SsoUserForm
          defaultValues={defaultSsoUserFormValues}
          userOptions={userOptions}
          providerOptions={providerOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
