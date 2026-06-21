"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserOption } from "@/features/users";

import { webhookCreateAction } from "../actions/webhook-create.action";
import { defaultWebhookFormValues } from "../lib/webhook-form-defaults";
import { mapFormValuesToWebhookCreateInput } from "../lib/webhook-form-mapper";
import { webhookFormFieldsSchema } from "../schemas/webhook-create.schema";
import { WebhookForm } from "./WebhookForm";

type WebhookCreateDialogProps = {
  open: boolean;
  userOptions: UserOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function WebhookCreateDialog({
  open,
  userOptions,
  onOpenChange,
  onSuccess,
}: WebhookCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create webhook</DialogTitle>
          <DialogDescription>
            Configure an endpoint to receive event notifications.
          </DialogDescription>
        </DialogHeader>

        <WebhookForm
          defaultValues={defaultWebhookFormValues}
          userOptions={userOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: webhookFormFieldsSchema,
            action: webhookCreateAction,
            mapInput: mapFormValuesToWebhookCreateInput,
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
