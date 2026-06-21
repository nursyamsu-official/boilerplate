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

import { ssoProviderUpdateAction } from "../actions/sso-provider-update.action";
import { mapFormValuesToSsoProviderUpdateInput } from "../lib/sso-provider-form-mapper";
import { ssoProviderUpdateFormFieldsSchema } from "../schemas/sso-provider-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: ssoProviderUpdateFormFieldsSchema,
              action: ssoProviderUpdateAction,
              mapInput: (values) =>
                mapFormValuesToSsoProviderUpdateInput(providerId, values),
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
