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

import { webhookUpdateAction } from "../actions/webhook-update.action";
import { mapFormValuesToWebhookUpdateInput } from "../lib/webhook-form-mapper";
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
  const handleSubmit = async (values: WebhookFormValues) => {
    if (!webhookId) return;

    await toast.promise(
      webhookUpdateAction(
        mapFormValuesToWebhookUpdateInput(webhookId, values),
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
