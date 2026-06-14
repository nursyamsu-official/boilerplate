"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailSettingUpdateAction } from "../actions/email-setting-update.action";
import { mapFormValuesToEmailSettingUpdateInput } from "../lib/email-setting-form-mapper";
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
  const handleSubmit = async (values: EmailSettingFormValues) => {
    if (!settingId) return;

    await toast.promise(
      emailSettingUpdateAction(
        mapFormValuesToEmailSettingUpdateInput(settingId, values),
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
