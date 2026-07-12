"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { evaluationScoringMethodGetByIdAction } from "../actions/evaluation-scoring-method-update.action";
import { buildEvaluationScoringMethodListUrl } from "../lib/evaluation-scoring-method-filter-url";
import { mapEvaluationScoringMethodDetailToFormValues } from "../lib/evaluation-scoring-method-form-defaults";
import type { EvaluationScoringMethodFilterInput } from "../schemas/evaluation-scoring-method-filter.schema";
import type {
  EvaluationScoringMethodFormValues,
  EvaluationScoringMethodListResult,
  EvaluationScoringMethodTableRow,
} from "../types/evaluation-scoring-method.type";
import { EvaluationScoringMethodTable } from "../table/EvaluationScoringMethodTable";
import { EvaluationScoringMethodCreateDialog } from "./EvaluationScoringMethodCreateDialog";
import { EvaluationScoringMethodEditDialog } from "./EvaluationScoringMethodEditDialog";

type EvaluationScoringMethodManagementProps = {
  initialData: EvaluationScoringMethodListResult;
  initialFilters: EvaluationScoringMethodFilterInput;
};

type EditDialogState = {
  evaluationScoringMethodId: string;
  defaultValues: EvaluationScoringMethodFormValues | null;
};

export function EvaluationScoringMethodManagement({
  initialData,
  initialFilters,
}: EvaluationScoringMethodManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<EvaluationScoringMethodFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEvaluationScoringMethodListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (evaluationScoringMethod: EvaluationScoringMethodTableRow) => {
    setEditDialogState({
      evaluationScoringMethodId: evaluationScoringMethod.id,
      defaultValues: null,
    });

    try {
      const detail = await evaluationScoringMethodGetByIdAction({ id: evaluationScoringMethod.id });
      setEditDialogState({
        evaluationScoringMethodId: evaluationScoringMethod.id,
        defaultValues: mapEvaluationScoringMethodDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load scoring method");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Scoring Methods</h2>
        <p className="text-sm text-muted-foreground">
          Manage scoring methods used to define scoring calculations.
        </p>
      </div>

      <EvaluationScoringMethodTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <EvaluationScoringMethodCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <EvaluationScoringMethodEditDialog
        open={editDialogState !== null}
        evaluationScoringMethodId={editDialogState?.evaluationScoringMethodId ?? null}
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
