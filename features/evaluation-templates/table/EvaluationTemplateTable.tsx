"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { EvaluationMethodOption } from "@/features/evaluation-methods";
import type { EvaluationScoringMethodOption } from "@/features/evaluation-scoring-methods";

import type { EvaluationTemplateFilterInput } from "../schemas/evaluation-template-filter.schema";
import type {
  EvaluationTemplateListResult,
  EvaluationTemplateTableRow,
} from "../types/evaluation-template.type";
import { createEvaluationTemplateColumns } from "./columns";
import { EvaluationTemplateTableToolbar } from "./EvaluationTemplateTableToolbar";

type EvaluationTemplateTableProps = {
  data: EvaluationTemplateListResult;
  filters: EvaluationTemplateFilterInput;
  methodOptions: EvaluationMethodOption[];
  scoringMethodOptions: EvaluationScoringMethodOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<EvaluationTemplateFilterInput>) => void;
  onEdit: (template: EvaluationTemplateTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function EvaluationTemplateTable({
  data,
  filters,
  methodOptions,
  scoringMethodOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: EvaluationTemplateTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (template: EvaluationTemplateTableRow) => {
      if (isEditLoading) return;
      void onEdit(template);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createEvaluationTemplateColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EvaluationTemplateFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
        onEdit: handleEdit,
        onRefresh,
      }),
    [filters.sortBy, filters.sortOrder, handleEdit, onRefresh, onFiltersChange],
  );

  const isFiltered =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.evaluationMethodId !== "all" ||
    filters.evaluationScoringMethodId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <EvaluationTemplateTableToolbar
        filters={filters}
        methodOptions={methodOptions}
        scoringMethodOptions={scoringMethodOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No evaluation templates yet"
        emptyDescription="Create your first evaluation template to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EvaluationTemplateFilterInput["sortBy"],
            sortOrder: first.desc ? "desc" : "asc",
            page: 1,
          });
        }}
      />

      <TablePagination
        page={data.page}
        pageSize={data.pageSize}
        total={data.total}
        onPageChange={(page) => onFiltersChange({ page })}
        onPageSizeChange={(pageSize) => onFiltersChange({ pageSize, page: 1 })}
      />
    </div>
  );
}
