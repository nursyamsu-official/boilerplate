"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { EvaluationMethodOption } from "@/features/evaluation-methods";
import type { EvaluationScoringMethodOption } from "@/features/evaluation-scoring-methods";

import { evaluationTemplateGetByIdAction } from "../actions/evaluation-template-update.action";
import { buildEvaluationTemplateListUrl } from "../lib/evaluation-template-filter-url";
import { mapEvaluationTemplateDetailToFormValues } from "../lib/evaluation-template-form-defaults";
import type { EvaluationTemplateFilterInput } from "../schemas/evaluation-template-filter.schema";
import type {
  EvaluationTemplateFormValues,
  EvaluationTemplateListResult,
  EvaluationTemplateTableRow,
} from "../types/evaluation-template.type";
import { EvaluationTemplateTable } from "../table/EvaluationTemplateTable";
import { EvaluationTemplateCreateDialog } from "./EvaluationTemplateCreateDialog";
import { EvaluationTemplateEditDialog } from "./EvaluationTemplateEditDialog";

type EvaluationTemplateManagementProps = {
  initialData: EvaluationTemplateListResult;
  initialFilters: EvaluationTemplateFilterInput;
  methodOptions: EvaluationMethodOption[];
  scoringMethodOptions: EvaluationScoringMethodOption[];
};

type EditDialogState = {
  evaluationTemplateId: string;
  defaultValues: EvaluationTemplateFormValues | null;
};

export function EvaluationTemplateManagement({
  initialData,
  initialFilters,
  methodOptions,
  scoringMethodOptions,
}: EvaluationTemplateManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<EvaluationTemplateFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEvaluationTemplateListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (template: EvaluationTemplateTableRow) => {
    setEditDialogState({
      evaluationTemplateId: template.id,
      defaultValues: null,
    });

    try {
      const detail = await evaluationTemplateGetByIdAction({ id: template.id });
      setEditDialogState({
        evaluationTemplateId: template.id,
        defaultValues: mapEvaluationTemplateDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load evaluation template");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Evaluation Templates</h2>
        <p className="text-sm text-muted-foreground">
          Manage evaluation templates with method and scoring method configuration.
        </p>
      </div>

      <EvaluationTemplateTable
        data={initialData}
        filters={initialFilters}
        methodOptions={methodOptions}
        scoringMethodOptions={scoringMethodOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <EvaluationTemplateCreateDialog
        open={isCreateOpen}
        methodOptions={methodOptions}
        scoringMethodOptions={scoringMethodOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <EvaluationTemplateEditDialog
        open={editDialogState !== null}
        evaluationTemplateId={editDialogState?.evaluationTemplateId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        methodOptions={methodOptions}
        scoringMethodOptions={scoringMethodOptions}
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
