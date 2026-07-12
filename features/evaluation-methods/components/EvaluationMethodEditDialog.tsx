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

import { evaluationMethodUpdateAction } from "../actions/evaluation-method-update.action";
import { mapFormValuesToEvaluationMethodUpdateInput } from "../lib/evaluation-method-form-mapper";
import { evaluationMethodFormFieldsSchema } from "../schemas/evaluation-method-create.schema";
import type { EvaluationMethodFormValues } from "../types/evaluation-method.type";
import { EvaluationMethodForm } from "./EvaluationMethodForm";

type EvaluationMethodEditDialogProps = {
  open: boolean;
  evaluationMethodId: string | null;
  defaultValues: EvaluationMethodFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function EvaluationMethodEditDialog({
  open,
  evaluationMethodId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: EvaluationMethodEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit evaluation method</DialogTitle>
          <DialogDescription>Update evaluation method details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && evaluationMethodId ? (
          <EvaluationMethodForm
            key={evaluationMethodId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: evaluationMethodFormFieldsSchema,
              action: evaluationMethodUpdateAction,
              mapInput: (values) =>
                mapFormValuesToEvaluationMethodUpdateInput(evaluationMethodId, values),
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
