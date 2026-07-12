"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { CountryFilterInput } from "../schemas/country-filter.schema";
import type {
  CountryListResult,
  CountryTableRow,
} from "../types/country.type";
import { createCountryColumns } from "./columns";
import { CountryTableToolbar } from "./CountryTableToolbar";

type CountryTableProps = {
  data: CountryListResult;
  filters: CountryFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<CountryFilterInput>) => void;
  onEdit: (country: CountryTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function CountryTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: CountryTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (country: CountryTableRow) => {
      if (isEditLoading) return;
      void onEdit(country);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createCountryColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as CountryFilterInput["sortBy"],
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
      <CountryTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No countries yet"
        emptyDescription="Create your first country to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as CountryFilterInput["sortBy"],
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
