"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EvaluationTemplateOption } from "@/features/evaluation-templates";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { evaluationCriteriaUpdateAction } from "../actions/evaluation-criteria-update.action";
import { mapFormValuesToEvaluationCriteriaUpdateInput } from "../lib/evaluation-criteria-form-mapper";
import { evaluationCriteriaFormFieldsSchema } from "../schemas/evaluation-criteria-create.schema";
import type { EvaluationCriteriaFormValues } from "../types/evaluation-criteria.type";
import { EvaluationCriteriaForm } from "./EvaluationCriteriaForm";

type EvaluationCriteriaEditDialogProps = {
  templateOptions: EvaluationTemplateOption[];
  open: boolean;
  evaluationCriteriaId: string | null;
  defaultValues: EvaluationCriteriaFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationCriteriaEditDialog({
  open,
  evaluationCriteriaId,
  defaultValues,
  templateOptions,
  onOpenChange,
  onSuccess,
}: EvaluationCriteriaEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit evaluation criterion</DialogTitle>
          <DialogDescription>Update evaluation criterion details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && evaluationCriteriaId ? (
          <EvaluationCriteriaForm
            key={evaluationCriteriaId}
            templateOptions={templateOptions}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: evaluationCriteriaFormFieldsSchema,
              action: evaluationCriteriaUpdateAction,
              mapInput: (values) =>
                mapFormValuesToEvaluationCriteriaUpdateInput(evaluationCriteriaId, values),
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
          <FormDialogSkeleton fields={5} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
