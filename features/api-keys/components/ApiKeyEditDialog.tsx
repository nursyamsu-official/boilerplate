"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { apiKeyUpdateAction } from "../actions/api-key.action";
import { mapFormValuesToUpdateInput } from "../lib/api-key-form";
import type { ApiKeyFormValues } from "../types/api-key.type";
import type { UserOption } from "@/features/users";
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
  const handleSubmit = async (values: ApiKeyFormValues) => {
    await toast.promise(
      apiKeyUpdateAction(mapFormValuesToUpdateInput(apiKeyId, values)).then(
        () => {
          onOpenChange(false);
          onSuccess();
        },
      ),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
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
          showStatusField
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
