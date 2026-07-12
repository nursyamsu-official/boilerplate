"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { CountryOption } from "@/features/countries";
import type { ProvinceOption } from "@/features/provinces";

import type { DistrictFilterInput } from "../schemas/district-filter.schema";
import type {
  DistrictListResult,
  DistrictTableRow,
} from "../types/district.type";
import { createDistrictColumns } from "./columns";
import { DistrictTableToolbar } from "./DistrictTableToolbar";

type DistrictTableProps = {
  data: DistrictListResult;
  filters: DistrictFilterInput;
  countryOptions: CountryOption[];
  provinceOptions: ProvinceOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<DistrictFilterInput>) => void;
  onEdit: (district: DistrictTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function DistrictTable({
  data,
  filters,
  countryOptions,
  provinceOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: DistrictTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (district: DistrictTableRow) => {
      if (isEditLoading) return;
      void onEdit(district);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createDistrictColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as DistrictFilterInput["sortBy"],
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
    filters.countryId !== "all" ||
    filters.provinceId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <DistrictTableToolbar
        filters={filters}
        countryOptions={countryOptions}
        provinceOptions={provinceOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No districts yet"
        emptyDescription="Create your first district to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as DistrictFilterInput["sortBy"],
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
