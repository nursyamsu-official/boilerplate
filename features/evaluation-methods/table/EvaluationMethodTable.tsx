"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { EvaluationMethodFilterInput } from "../schemas/evaluation-method-filter.schema";
import type {
  EvaluationMethodListResult,
  EvaluationMethodTableRow,
} from "../types/evaluation-method.type";
import { createEvaluationMethodColumns } from "./columns";
import { EvaluationMethodTableToolbar } from "./EvaluationMethodTableToolbar";

type EvaluationMethodTableProps = {
  data: EvaluationMethodListResult;
  filters: EvaluationMethodFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<EvaluationMethodFilterInput>) => void;
  onEdit: (country: EvaluationMethodTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function EvaluationMethodTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: EvaluationMethodTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (country: EvaluationMethodTableRow) => {
      if (isEditLoading) return;
      void onEdit(country);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createEvaluationMethodColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EvaluationMethodFilterInput["sortBy"],
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
      <EvaluationMethodTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No methods yet"
        emptyDescription="Create your first evaluation method to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EvaluationMethodFilterInput["sortBy"],
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
