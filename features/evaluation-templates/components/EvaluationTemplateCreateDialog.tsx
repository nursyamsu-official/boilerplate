"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EvaluationMethodOption } from "@/features/evaluation-methods";
import type { EvaluationScoringMethodOption } from "@/features/evaluation-scoring-methods";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { evaluationTemplateCreateAction } from "../actions/evaluation-template-create.action";
import { defaultEvaluationTemplateFormValues } from "../lib/evaluation-template-form-defaults";
import { mapFormValuesToEvaluationTemplateCreateInput } from "../lib/evaluation-template-form-mapper";
import { evaluationTemplateFormFieldsSchema } from "../schemas/evaluation-template-create.schema";
import { EvaluationTemplateForm } from "./EvaluationTemplateForm";

type EvaluationTemplateCreateDialogProps = {
  open: boolean;
  methodOptions: EvaluationMethodOption[];
  scoringMethodOptions: EvaluationScoringMethodOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationTemplateCreateDialog({
  open,
  methodOptions,
  scoringMethodOptions,
  onOpenChange,
  onSuccess,
}: EvaluationTemplateCreateDialogProps) {
  const defaultValues = {
    ...defaultEvaluationTemplateFormValues,
    evaluationMethodId: methodOptions[0]?.id ?? "",
    evaluationScoringMethodId: scoringMethodOptions[0]?.id ?? "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create evaluation template</DialogTitle>
          <DialogDescription>
            Add a new evaluation template with method and scoring method.
          </DialogDescription>
        </DialogHeader>

        <EvaluationTemplateForm
          key={`${defaultValues.evaluationMethodId}-${defaultValues.evaluationScoringMethodId}`}
          defaultValues={defaultValues}
          methodOptions={methodOptions}
          scoringMethodOptions={scoringMethodOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: evaluationTemplateFormFieldsSchema,
            action: evaluationTemplateCreateAction,
            mapInput: mapFormValuesToEvaluationTemplateCreateInput,
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
