"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailTemplateCreateAction } from "../actions/email-template-create.action";
import { defaultEmailTemplateFormValues } from "../lib/email-template-form-defaults";
import { mapFormValuesToEmailTemplateCreateInput } from "../lib/email-template-form-mapper";
import type { EmailTemplateFormValues } from "../types/email-template.type";
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
  const handleSubmit = async (values: EmailTemplateFormValues) => {
    await toast.promise(
      emailTemplateCreateAction(
        mapFormValuesToEmailTemplateCreateInput(values),
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
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
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
