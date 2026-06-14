"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailSettingCreateAction } from "../actions/email-setting-create.action";
import { defaultEmailSettingFormValues } from "../lib/email-setting-form-defaults";
import type { EmailSettingFormValues } from "../types/email-setting.type";
import { EmailSettingForm } from "./EmailSettingForm";

type EmailSettingCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EmailSettingCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: EmailSettingCreateDialogProps) {
  const handleSubmit = async (values: EmailSettingFormValues) => {
    await toast.promise(
      emailSettingCreateAction(values).then(() => {
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
          <DialogTitle>Create email setting</DialogTitle>
          <DialogDescription>
            Configure a provider for outbound email delivery.
          </DialogDescription>
        </DialogHeader>

        <EmailSettingForm
          defaultValues={defaultEmailSettingFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
