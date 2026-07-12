"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
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

import { evaluationTemplateUpdateAction } from "../actions/evaluation-template-update.action";
import { mapFormValuesToEvaluationTemplateUpdateInput } from "../lib/evaluation-template-form-mapper";
import { evaluationTemplateFormFieldsSchema } from "../schemas/evaluation-template-create.schema";
import type { EvaluationTemplateFormValues } from "../types/evaluation-template.type";
import { EvaluationTemplateForm } from "./EvaluationTemplateForm";

type EvaluationTemplateEditDialogProps = {
  open: boolean;
  evaluationTemplateId: string | null;
  defaultValues: EvaluationTemplateFormValues | null;
  methodOptions: EvaluationMethodOption[];
  scoringMethodOptions: EvaluationScoringMethodOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationTemplateEditDialog({
  open,
  evaluationTemplateId,
  defaultValues,
  methodOptions,
  scoringMethodOptions,
  onOpenChange,
  onSuccess,
}: EvaluationTemplateEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit evaluation template</DialogTitle>
          <DialogDescription>
            Update evaluation template details and configuration.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && evaluationTemplateId ? (
          <EvaluationTemplateForm
            key={evaluationTemplateId}
            defaultValues={defaultValues}
            methodOptions={methodOptions}
            scoringMethodOptions={scoringMethodOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: evaluationTemplateFormFieldsSchema,
              action: evaluationTemplateUpdateAction,
              mapInput: (values) =>
                mapFormValuesToEvaluationTemplateUpdateInput(evaluationTemplateId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: createDialogSubmitSuccessHandler(onOpenChange, onSuccess),
            }}
          />
        ) : (
          <FormDialogSkeleton fields={6} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
