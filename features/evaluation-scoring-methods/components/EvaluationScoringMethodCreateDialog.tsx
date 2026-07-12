"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { evaluationScoringMethodCreateAction } from "../actions/evaluation-scoring-method-create.action";
import { defaultEvaluationScoringMethodFormValues } from "../lib/evaluation-scoring-method-form-defaults";
import { mapFormValuesToEvaluationScoringMethodCreateInput } from "../lib/evaluation-scoring-method-form-mapper";
import { evaluationScoringMethodFormFieldsSchema } from "../schemas/evaluation-scoring-method-create.schema";
import { EvaluationScoringMethodForm } from "./EvaluationScoringMethodForm";

type EvaluationScoringMethodCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationScoringMethodCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: EvaluationScoringMethodCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create scoring method</DialogTitle>
          <DialogDescription>
            Add a new scoring method.
          </DialogDescription>
        </DialogHeader>

        <EvaluationScoringMethodForm
          defaultValues={defaultEvaluationScoringMethodFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: evaluationScoringMethodFormFieldsSchema,
            action: evaluationScoringMethodCreateAction,
            mapInput: mapFormValuesToEvaluationScoringMethodCreateInput,
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
