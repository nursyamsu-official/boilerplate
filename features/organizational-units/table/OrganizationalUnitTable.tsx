"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { CompanyOption } from "@/features/companies";

import type { OrganizationalUnitFilterInput } from "../schemas/organizational-unit-filter.schema";
import type {
  OrganizationalUnitListResult,
  OrganizationalUnitTableRow,
} from "../types/organizational-unit.type";
import { createOrganizationalUnitColumns } from "./columns";
import { OrganizationalUnitTableToolbar } from "./OrganizationalUnitTableToolbar";

type OrganizationalUnitTableProps = {
  data: OrganizationalUnitListResult;
  filters: OrganizationalUnitFilterInput;
  companyOptions: CompanyOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<OrganizationalUnitFilterInput>) => void;
  onEdit: (unit: OrganizationalUnitTableRow) => void;
  onCreate: () => void;
  onPreview: () => void;
  onRefresh: () => void;
};

export function OrganizationalUnitTable({
  data,
  filters,
  companyOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onPreview,
  onRefresh,
}: OrganizationalUnitTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (unit: OrganizationalUnitTableRow) => {
      if (isEditLoading) return;
      void onEdit(unit);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createOrganizationalUnitColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as OrganizationalUnitFilterInput["sortBy"],
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
      <OrganizationalUnitTableToolbar
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
        emptyTitle="No organizational units yet"
        emptyDescription="Create your first organizational unit to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as OrganizationalUnitFilterInput["sortBy"],
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
