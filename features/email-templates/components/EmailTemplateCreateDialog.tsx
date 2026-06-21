"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailTemplateCreateAction } from "../actions/email-template-create.action";
import { defaultEmailTemplateFormValues } from "../lib/email-template-form-defaults";
import { mapFormValuesToEmailTemplateCreateInput } from "../lib/email-template-form-mapper";
import { emailTemplateFormFieldsSchema } from "../schemas/email-template-create.schema";
import { EmailTemplateForm } from "./EmailTemplateForm";

type EmailTemplateCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EmailTemplateCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: EmailTemplateCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create email template</DialogTitle>
          <DialogDescription>
            Define reusable email content for system notifications.
          </DialogDescription>
        </DialogHeader>

        <EmailTemplateForm
          defaultValues={defaultEmailTemplateFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: emailTemplateFormFieldsSchema,
            action: emailTemplateCreateAction,
            mapInput: mapFormValuesToEmailTemplateCreateInput,
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
