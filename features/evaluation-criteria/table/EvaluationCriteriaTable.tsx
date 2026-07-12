"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { EvaluationTemplateOption } from "@/features/evaluation-templates";

import type { EvaluationCriteriaFilterInput } from "../schemas/evaluation-criteria-filter.schema";
import type {
  EvaluationCriteriaListResult,
  EvaluationCriteriaTableRow,
} from "../types/evaluation-criteria.type";
import { createEvaluationCriteriaColumns } from "./columns";
import { EvaluationCriteriaTableToolbar } from "./EvaluationCriteriaTableToolbar";

type EvaluationCriteriaTableProps = {
  data: EvaluationCriteriaListResult;
  filters: EvaluationCriteriaFilterInput;
  templateOptions: EvaluationTemplateOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<EvaluationCriteriaFilterInput>) => void;
  onEdit: (country: EvaluationCriteriaTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function EvaluationCriteriaTable({
  data,
  filters,
  templateOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: EvaluationCriteriaTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (country: EvaluationCriteriaTableRow) => {
      if (isEditLoading) return;
      void onEdit(country);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createEvaluationCriteriaColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EvaluationCriteriaFilterInput["sortBy"],
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
    filters.templateId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <EvaluationCriteriaTableToolbar
        filters={filters}
        templateOptions={templateOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No criteria yet"
        emptyDescription="Create your first evaluation criterion to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EvaluationCriteriaFilterInput["sortBy"],
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
        onPageSizeChange={(pageSize) =>
          onFiltersChange({ pageSize, page: 1 })
        }
      />
    </div>
  );
}
