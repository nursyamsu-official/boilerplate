"use client";

import { useRef, useState } from "react";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserOption } from "@/features/users";

import { apiKeyCreateAction } from "../actions/api-key.action";
import {
  defaultApiKeyFormValues,
  mapFormValuesToCreateInput,
} from "../lib/api-key-form";
import { apiKeyFormFieldsSchema } from "../schemas/api-key.schema";
import type { ApiKeyFormValues } from "../types/api-key.type";
import type { FormActionSubmitConfig } from "@/lib/use-form-action-submit";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyRevealDialog } from "./ApiKeyRevealDialog";

type ApiKeyCreateDialogProps = {
  open: boolean;
  userOptions: UserOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

type ApiKeyCreateResult = {
  rawKey: string;
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
  const submittedNameRef = useRef("");

  const submitConfig: FormActionSubmitConfig<ApiKeyFormValues, unknown> = {
    schema: apiKeyFormFieldsSchema,
    action: apiKeyCreateAction,
    mapInput: (values) => {
      submittedNameRef.current = values.name;
      return mapFormValuesToCreateInput(values);
    },
    toast: {
      loading: "Creating...",
      success: "Created successfully",
      errorFallback: "Failed to save",
    },
    onSuccess: (data) => {
      const createResult = data as ApiKeyCreateResult;
      onOpenChange(false);
      onSuccess();
      setRevealState({
        rawKey: createResult.rawKey,
        name: submittedNameRef.current,
      });
    },
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogScrollContent className="sm:max-w-lg">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={submitConfig}
          />
        </DialogScrollContent>
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
