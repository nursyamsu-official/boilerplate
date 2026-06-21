"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RoleOption } from "@/features/roles";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { ssoProviderCreateAction } from "../actions/sso-provider-create.action";
import { defaultSsoProviderFormValues } from "../lib/sso-provider-form-defaults";
import { mapFormValuesToSsoProviderCreateInput } from "../lib/sso-provider-form-mapper";
import { ssoProviderFormFieldsSchema } from "../schemas/sso-provider-create.schema";
import { SsoProviderForm } from "./SsoProviderForm";

type SsoProviderCreateDialogProps = {
  open: boolean;
  roleOptions: RoleOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function SsoProviderCreateDialog({
  open,
  roleOptions,
  onOpenChange,
  onSuccess,
}: SsoProviderCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create SSO provider</DialogTitle>
          <DialogDescription>
            Configure an external identity provider for single sign-on.
          </DialogDescription>
        </DialogHeader>

        <SsoProviderForm
          defaultValues={defaultSsoProviderFormValues}
          roleOptions={roleOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: ssoProviderFormFieldsSchema,
            action: ssoProviderCreateAction,
            mapInput: mapFormValuesToSsoProviderCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: createDialogSubmitSuccessHandler(
              onOpenChange,
              onSuccess,
            ),
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
