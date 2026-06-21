"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SsoProviderOption } from "@/features/sso-providers";
import type { UserOption } from "@/features/users";

import { ssoUserCreateAction } from "../actions/sso-user-create.action";
import { defaultSsoUserFormValues } from "../lib/sso-user-form-defaults";
import { mapFormValuesToSsoUserCreateInput } from "../lib/sso-user-form-mapper";
import { ssoUserFormFieldsSchema } from "../schemas/sso-user-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: ssoUserFormFieldsSchema,
            action: ssoUserCreateAction,
            mapInput: mapFormValuesToSsoUserCreateInput,
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
