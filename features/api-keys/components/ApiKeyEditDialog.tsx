"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserOption } from "@/features/users";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { apiKeyUpdateAction } from "../actions/api-key.action";
import { mapFormValuesToUpdateInput } from "../lib/api-key-form";
import { apiKeyFormFieldsSchema } from "../schemas/api-key.schema";
import type { ApiKeyFormValues } from "../types/api-key.type";
import { ApiKeyForm } from "./ApiKeyForm";

type ApiKeyEditDialogProps = {
  open: boolean;
  apiKeyId: string;
  defaultValues: ApiKeyFormValues;
  userOptions: UserOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ApiKeyEditDialog({
  open,
  apiKeyId,
  defaultValues,
  userOptions,
  onOpenChange,
  onSuccess,
}: ApiKeyEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit API key</DialogTitle>
          <DialogDescription>
            Update API key metadata. The key value itself cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <ApiKeyForm
          defaultValues={defaultValues}
          userOptions={userOptions}
          submitLabel="Update"
          pendingLabel="Updating..."
          layout="dialog"
          showStatusField
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: apiKeyFormFieldsSchema,
            action: apiKeyUpdateAction,
            mapInput: (values) => mapFormValuesToUpdateInput(apiKeyId, values),
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
      </DialogScrollContent>
    </Dialog>
  );
}
