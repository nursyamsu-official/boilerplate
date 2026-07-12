"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { CompanyOption } from "@/features/companies";

import type { LogisticUnitFilterInput } from "../schemas/logistic-unit-filter.schema";
import type {
  LogisticUnitListResult,
  LogisticUnitTableRow,
} from "../types/logistic-unit.type";
import { createLogisticUnitColumns } from "./columns";
import { LogisticUnitTableToolbar } from "./LogisticUnitTableToolbar";

type LogisticUnitTableProps = {
  data: LogisticUnitListResult;
  filters: LogisticUnitFilterInput;
  companyOptions: CompanyOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<LogisticUnitFilterInput>) => void;
  onEdit: (unit: LogisticUnitTableRow) => void;
  onCreate: () => void;
  onPreview: () => void;
  onRefresh: () => void;
};

export function LogisticUnitTable({
  data,
  filters,
  companyOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onPreview,
  onRefresh,
}: LogisticUnitTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (unit: LogisticUnitTableRow) => {
      if (isEditLoading) return;
      void onEdit(unit);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createLogisticUnitColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as LogisticUnitFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
        onEdit: handleEdit,
        onRefresh,
      }),
    [
      filters.sortBy,
      filters.sortOrder,
      handleEdit,
      onRefresh,
      onFiltersChange,
    ],
  );

  const isFiltered =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.companyId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <LogisticUnitTableToolbar
        filters={filters}
        companyOptions={companyOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
        onPreview={onPreview}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No Logistic Units yet"
        emptyDescription="Create your first Logistic Unit to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as LogisticUnitFilterInput["sortBy"],
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
