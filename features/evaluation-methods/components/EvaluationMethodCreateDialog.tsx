"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { evaluationMethodCreateAction } from "../actions/evaluation-method-create.action";
import { defaultEvaluationMethodFormValues } from "../lib/evaluation-method-form-defaults";
import { mapFormValuesToEvaluationMethodCreateInput } from "../lib/evaluation-method-form-mapper";
import { evaluationMethodFormFieldsSchema } from "../schemas/evaluation-method-create.schema";
import { EvaluationMethodForm } from "./EvaluationMethodForm";

type EvaluationMethodCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationMethodCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: EvaluationMethodCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create evaluation method</DialogTitle>
          <DialogDescription>
            Add a new evaluation method.
          </DialogDescription>
        </DialogHeader>

        <EvaluationMethodForm
          defaultValues={defaultEvaluationMethodFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: evaluationMethodFormFieldsSchema,
            action: evaluationMethodCreateAction,
            mapInput: mapFormValuesToEvaluationMethodCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: createDialogSubmitSuccessHandler(onOpenChange, onSuccess),
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
