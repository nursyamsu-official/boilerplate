"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { emailTemplateUpdateAction } from "../actions/email-template-update.action";
import { mapFormValuesToEmailTemplateUpdateInput } from "../lib/email-template-form-mapper";
import { emailTemplateFormFieldsSchema } from "../schemas/email-template-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: emailTemplateFormFieldsSchema,
              action: emailTemplateUpdateAction,
              mapInput: (values) =>
                mapFormValuesToEmailTemplateUpdateInput(templateId, values),
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
          <FormDialogSkeleton fields={6} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
