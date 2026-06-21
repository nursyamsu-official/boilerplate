"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailSettingUpdateAction } from "../actions/email-setting-update.action";
import {
  emailSettingUpdateFormFieldsSchema,
  emailSettingUpdateSchema,
} from "../schemas/email-setting-create.schema";
import type { EmailSettingFormValues } from "../types/email-setting.type";
import { EmailSettingForm } from "./EmailSettingForm";

type EmailSettingEditDialogProps = {
  open: boolean;
  settingId: string | null;
  defaultValues: EmailSettingFormValues | null;
  hasPassword?: boolean;
  hasApiKey?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EmailSettingEditDialog({
  open,
  settingId,
  defaultValues,
  hasPassword = false,
  hasApiKey = false,
  onOpenChange,
  onSuccess,
}: EmailSettingEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit email setting</DialogTitle>
          <DialogDescription>Update provider configuration and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && settingId ? (
          <EmailSettingForm
            key={settingId}
            defaultValues={defaultValues}
            isEdit
            hasPassword={hasPassword}
            hasApiKey={hasApiKey}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: emailSettingUpdateFormFieldsSchema,
              action: emailSettingUpdateAction,
              mapInput: (values) =>
                emailSettingUpdateSchema.parse({ id: settingId, ...values }),
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
