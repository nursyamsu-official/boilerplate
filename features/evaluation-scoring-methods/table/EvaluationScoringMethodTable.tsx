"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { EvaluationScoringMethodFilterInput } from "../schemas/evaluation-scoring-method-filter.schema";
import type {
  EvaluationScoringMethodListResult,
  EvaluationScoringMethodTableRow,
} from "../types/evaluation-scoring-method.type";
import { createEvaluationScoringMethodColumns } from "./columns";
import { EvaluationScoringMethodTableToolbar } from "./EvaluationScoringMethodTableToolbar";

type EvaluationScoringMethodTableProps = {
  data: EvaluationScoringMethodListResult;
  filters: EvaluationScoringMethodFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<EvaluationScoringMethodFilterInput>) => void;
  onEdit: (country: EvaluationScoringMethodTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function EvaluationScoringMethodTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: EvaluationScoringMethodTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (country: EvaluationScoringMethodTableRow) => {
      if (isEditLoading) return;
      void onEdit(country);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createEvaluationScoringMethodColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EvaluationScoringMethodFilterInput["sortBy"],
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
    filters.search.length > 0 || filters.isActive !== "all";

  return (
    <div className="flex flex-col gap-4">
      <EvaluationScoringMethodTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No scoring methods yet"
        emptyDescription="Create your first scoring method to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EvaluationScoringMethodFilterInput["sortBy"],
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
