"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailTemplateUpdateAction } from "../actions/email-template-update.action";
import { mapFormValuesToEmailTemplateUpdateInput } from "../lib/email-template-form-mapper";
import type { EmailTemplateFormValues } from "../types/email-template.type";
import { EmailTemplateForm } from "./EmailTemplateForm";

type EmailTemplateEditDialogProps = {
  open: boolean;
  templateId: string | null;
  defaultValues: EmailTemplateFormValues | null;
  isSystem?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EmailTemplateEditDialog({
  open,
  templateId,
  defaultValues,
  isSystem = false,
  onOpenChange,
  onSuccess,
}: EmailTemplateEditDialogProps) {
  const handleSubmit = async (values: EmailTemplateFormValues) => {
    if (!templateId) return;

    await toast.promise(
      emailTemplateUpdateAction(
        mapFormValuesToEmailTemplateUpdateInput(templateId, values),
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit email template</DialogTitle>
          <DialogDescription>Update template content and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && templateId ? (
          <EmailTemplateForm
            key={templateId}
            defaultValues={defaultValues}
            isSystem={isSystem}
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
