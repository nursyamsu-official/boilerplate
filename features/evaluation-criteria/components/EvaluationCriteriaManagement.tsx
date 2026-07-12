"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { EvaluationTemplateOption } from "@/features/evaluation-templates";

import { evaluationCriteriaGetByIdAction } from "../actions/evaluation-criteria-update.action";
import { buildEvaluationCriteriaListUrl } from "../lib/evaluation-criteria-filter-url";
import { mapEvaluationCriteriaDetailToFormValues } from "../lib/evaluation-criteria-form-defaults";
import type { EvaluationCriteriaFilterInput } from "../schemas/evaluation-criteria-filter.schema";
import type {
  EvaluationCriteriaFormValues,
  EvaluationCriteriaListResult,
  EvaluationCriteriaTableRow,
} from "../types/evaluation-criteria.type";
import { EvaluationCriteriaTable } from "../table/EvaluationCriteriaTable";
import { EvaluationCriteriaCreateDialog } from "./EvaluationCriteriaCreateDialog";
import { EvaluationCriteriaEditDialog } from "./EvaluationCriteriaEditDialog";

type EvaluationCriteriaManagementProps = {
  initialData: EvaluationCriteriaListResult;
  initialFilters: EvaluationCriteriaFilterInput;
  templateOptions: EvaluationTemplateOption[];
};

type EditDialogState = {
  evaluationCriteriaId: string;
  defaultValues: EvaluationCriteriaFormValues | null;
};

export function EvaluationCriteriaManagement({
  initialData,
  initialFilters,
  templateOptions,
}: EvaluationCriteriaManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<EvaluationCriteriaFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEvaluationCriteriaListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (evaluationCriteria: EvaluationCriteriaTableRow) => {
    setEditDialogState({
      evaluationCriteriaId: evaluationCriteria.id,
      defaultValues: null,
    });

    try {
      const detail = await evaluationCriteriaGetByIdAction({ id: evaluationCriteria.id });
      setEditDialogState({
        evaluationCriteriaId: evaluationCriteria.id,
        defaultValues: mapEvaluationCriteriaDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load evaluation criterion");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Evaluation Criteria</h2>
        <p className="text-sm text-muted-foreground">
          Manage evaluation criteria within evaluation templates.
        </p>
      </div>

      <EvaluationCriteriaTable
        data={initialData}
        filters={initialFilters}
        templateOptions={templateOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <EvaluationCriteriaCreateDialog
        open={isCreateOpen}
        templateOptions={templateOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <EvaluationCriteriaEditDialog
        open={editDialogState !== null}
        evaluationCriteriaId={editDialogState?.evaluationCriteriaId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        templateOptions={templateOptions}
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
