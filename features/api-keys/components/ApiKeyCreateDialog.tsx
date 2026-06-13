"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { apiKeyCreateAction } from "../actions/api-key.action";
import {
  defaultApiKeyFormValues,
  mapFormValuesToCreateInput,
} from "../lib/api-key-form";
import type { ApiKeyFormValues } from "../types/api-key.type";
import type { UserOption } from "@/features/users";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyRevealDialog } from "./ApiKeyRevealDialog";

type ApiKeyCreateDialogProps = {
  open: boolean;
  userOptions: UserOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

type RevealState = {
  rawKey: string;
  name: string;
};

export function ApiKeyCreateDialog({
  open,
  userOptions,
  onOpenChange,
  onSuccess,
}: ApiKeyCreateDialogProps) {
  const [revealState, setRevealState] = useState<RevealState | null>(null);

  const handleSubmit = async (values: ApiKeyFormValues) => {
    await toast.promise(
      apiKeyCreateAction(mapFormValuesToCreateInput(values)).then((result) => {
        onOpenChange(false);
        onSuccess();
        setRevealState({ rawKey: result.rawKey, name: values.name });
      }),
      {
        loading: "Creating...",
        success: "Created successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create API key</DialogTitle>
            <DialogDescription>
              Generate a new API key for a user. The key value is shown only once.
            </DialogDescription>
          </DialogHeader>

          <ApiKeyForm
            defaultValues={defaultApiKeyFormValues}
            userOptions={userOptions}
            submitLabel="Create"
            pendingLabel="Creating..."
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>

      <ApiKeyRevealDialog
        open={revealState !== null}
        rawKey={revealState?.rawKey ?? null}
        name={revealState?.name ?? ""}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setRevealState(null);
          }
        }}
      />
    </>
  );
}
