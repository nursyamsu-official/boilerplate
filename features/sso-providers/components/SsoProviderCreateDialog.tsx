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

import { ssoProviderCreateAction } from "../actions/sso-provider-create.action";
import { defaultSsoProviderFormValues } from "../lib/sso-provider-form-defaults";
import { mapFormValuesToSsoProviderCreateInput } from "../lib/sso-provider-form-mapper";
import type { SsoProviderFormValues } from "../types/sso-provider.type";
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
  const handleSubmit = async (values: SsoProviderFormValues) => {
    await toast.promise(
      ssoProviderCreateAction(
        mapFormValuesToSsoProviderCreateInput(values),
      ).then(() => {
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
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
