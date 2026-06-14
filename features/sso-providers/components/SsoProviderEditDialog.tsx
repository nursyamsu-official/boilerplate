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

import { ssoProviderUpdateAction } from "../actions/sso-provider-update.action";
import { mapFormValuesToSsoProviderUpdateInput } from "../lib/sso-provider-form-mapper";
import type { SsoProviderFormValues } from "../types/sso-provider.type";
import { SsoProviderForm } from "./SsoProviderForm";

type SsoProviderEditDialogProps = {
  open: boolean;
  providerId: string | null;
  defaultValues: SsoProviderFormValues | null;
  roleOptions: RoleOption[];
  hasClientSecret?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function SsoProviderEditDialog({
  open,
  providerId,
  defaultValues,
  roleOptions,
  hasClientSecret = false,
  onOpenChange,
  onSuccess,
}: SsoProviderEditDialogProps) {
  const handleSubmit = async (values: SsoProviderFormValues) => {
    if (!providerId) return;

    await toast.promise(
      ssoProviderUpdateAction(
        mapFormValuesToSsoProviderUpdateInput(providerId, values),
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
          <DialogTitle>Edit SSO provider</DialogTitle>
          <DialogDescription>
            Update provider configuration and status.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && providerId ? (
          <SsoProviderForm
            key={providerId}
            defaultValues={defaultValues}
            roleOptions={roleOptions}
            isEdit
            hasClientSecret={hasClientSecret}
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
