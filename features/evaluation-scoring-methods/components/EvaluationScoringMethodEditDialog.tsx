"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { evaluationScoringMethodUpdateAction } from "../actions/evaluation-scoring-method-update.action";
import { mapFormValuesToEvaluationScoringMethodUpdateInput } from "../lib/evaluation-scoring-method-form-mapper";
import { evaluationScoringMethodFormFieldsSchema } from "../schemas/evaluation-scoring-method-create.schema";
import type { EvaluationScoringMethodFormValues } from "../types/evaluation-scoring-method.type";
import { EvaluationScoringMethodForm } from "./EvaluationScoringMethodForm";

type EvaluationScoringMethodEditDialogProps = {
  open: boolean;
  evaluationScoringMethodId: string | null;
  defaultValues: EvaluationScoringMethodFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationScoringMethodEditDialog({
  open,
  evaluationScoringMethodId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: EvaluationScoringMethodEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit scoring method</DialogTitle>
          <DialogDescription>Update scoring method details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && evaluationScoringMethodId ? (
          <EvaluationScoringMethodForm
            key={evaluationScoringMethodId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: evaluationScoringMethodFormFieldsSchema,
              action: evaluationScoringMethodUpdateAction,
              mapInput: (values) =>
                mapFormValuesToEvaluationScoringMethodUpdateInput(evaluationScoringMethodId, values),
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
        ) : (
          <FormDialogSkeleton fields={4} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
