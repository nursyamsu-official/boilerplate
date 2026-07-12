"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { evaluationMethodGetByIdAction } from "../actions/evaluation-method-update.action";
import { buildEvaluationMethodListUrl } from "../lib/evaluation-method-filter-url";
import { mapEvaluationMethodDetailToFormValues } from "../lib/evaluation-method-form-defaults";
import type { EvaluationMethodFilterInput } from "../schemas/evaluation-method-filter.schema";
import type {
  EvaluationMethodFormValues,
  EvaluationMethodListResult,
  EvaluationMethodTableRow,
} from "../types/evaluation-method.type";
import { EvaluationMethodTable } from "../table/EvaluationMethodTable";
import { EvaluationMethodCreateDialog } from "./EvaluationMethodCreateDialog";
import { EvaluationMethodEditDialog } from "./EvaluationMethodEditDialog";

type EvaluationMethodManagementProps = {
  initialData: EvaluationMethodListResult;
  initialFilters: EvaluationMethodFilterInput;
};

type EditDialogState = {
  evaluationMethodId: string;
  defaultValues: EvaluationMethodFormValues | null;
};

export function EvaluationMethodManagement({
  initialData,
  initialFilters,
}: EvaluationMethodManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<EvaluationMethodFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEvaluationMethodListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (evaluationMethod: EvaluationMethodTableRow) => {
    setEditDialogState({
      evaluationMethodId: evaluationMethod.id,
      defaultValues: null,
    });

    try {
      const detail = await evaluationMethodGetByIdAction({ id: evaluationMethod.id });
      setEditDialogState({
        evaluationMethodId: evaluationMethod.id,
        defaultValues: mapEvaluationMethodDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load evaluation method");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Evaluation Methods</h2>
        <p className="text-sm text-muted-foreground">
          Manage evaluation methods used to define evaluation approaches.
        </p>
      </div>

      <EvaluationMethodTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <EvaluationMethodCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <EvaluationMethodEditDialog
        open={editDialogState !== null}
        evaluationMethodId={editDialogState?.evaluationMethodId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogState(null);
          }
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
