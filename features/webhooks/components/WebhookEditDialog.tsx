"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserOption } from "@/features/users";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { webhookUpdateAction } from "../actions/webhook-update.action";
import { mapFormValuesToWebhookUpdateInput } from "../lib/webhook-form-mapper";
import { webhookUpdateFormFieldsSchema } from "../schemas/webhook-create.schema";
import type { WebhookFormValues } from "../types/webhook.type";
import { WebhookForm } from "./WebhookForm";

type WebhookEditDialogProps = {
  open: boolean;
  webhookId: string | null;
  defaultValues: WebhookFormValues | null;
  userOptions: UserOption[];
  hasSecret?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function WebhookEditDialog({
  open,
  webhookId,
  defaultValues,
  userOptions,
  hasSecret = false,
  onOpenChange,
  onSuccess,
}: WebhookEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit webhook</DialogTitle>
          <DialogDescription>Update webhook configuration and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && webhookId ? (
          <WebhookForm
            key={webhookId}
            defaultValues={defaultValues}
            userOptions={userOptions}
            isEdit
            hasSecret={hasSecret}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: webhookUpdateFormFieldsSchema,
              action: webhookUpdateAction,
              mapInput: (values) =>
                mapFormValuesToWebhookUpdateInput(webhookId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: createDialogSubmitSuccessHandler(
                onOpenChange,
                onSuccess,
              ),
            }}
          />
        ) : (
          <FormDialogSkeleton fields={6} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
