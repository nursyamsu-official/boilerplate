"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { emailSettingCreateAction } from "../actions/email-setting-create.action";
import { defaultEmailSettingFormValues } from "../lib/email-setting-form-defaults";
import { emailSettingCreateSchema, emailSettingFormFieldsSchema } from "../schemas/email-setting-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: emailSettingFormFieldsSchema,
            action: emailSettingCreateAction,
            mapInput: (values) => emailSettingCreateSchema.parse(values),
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
