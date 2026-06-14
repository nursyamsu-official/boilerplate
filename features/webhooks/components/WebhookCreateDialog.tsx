"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserOption } from "@/features/users";

import { webhookCreateAction } from "../actions/webhook-create.action";
import { defaultWebhookFormValues } from "../lib/webhook-form-defaults";
import { mapFormValuesToWebhookCreateInput } from "../lib/webhook-form-mapper";
import type { WebhookFormValues } from "../types/webhook.type";
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
  const handleSubmit = async (values: WebhookFormValues) => {
    await toast.promise(
      webhookCreateAction(mapFormValuesToWebhookCreateInput(values)).then(() => {
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
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
