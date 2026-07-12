"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EvaluationTemplateOption } from "@/features/evaluation-templates";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { evaluationCriteriaCreateAction } from "../actions/evaluation-criteria-create.action";
import { defaultEvaluationCriteriaFormValues } from "../lib/evaluation-criteria-form-defaults";
import { mapFormValuesToEvaluationCriteriaCreateInput } from "../lib/evaluation-criteria-form-mapper";
import { evaluationCriteriaFormFieldsSchema } from "../schemas/evaluation-criteria-create.schema";
import { EvaluationCriteriaForm } from "./EvaluationCriteriaForm";

type EvaluationCriteriaCreateDialogProps = {
  templateOptions: EvaluationTemplateOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationCriteriaCreateDialog({
  open,
  templateOptions,
  onOpenChange,
  onSuccess,
}: EvaluationCriteriaCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create evaluation criterion</DialogTitle>
          <DialogDescription>Add a new evaluation criterion.</DialogDescription>
        </DialogHeader>

        <EvaluationCriteriaForm
          templateOptions={templateOptions}
          defaultValues={defaultEvaluationCriteriaFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: evaluationCriteriaFormFieldsSchema,
            action: evaluationCriteriaCreateAction,
            mapInput: mapFormValuesToEvaluationCriteriaCreateInput,
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
