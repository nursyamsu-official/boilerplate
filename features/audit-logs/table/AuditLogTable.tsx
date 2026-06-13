"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { AuditLogFilterInput } from "../schemas/audit-log-filter.schema";
import type {
  AuditLogListResult,
  AuditLogTableRow,
} from "../types/audit-log.type";
import { createAuditLogColumns } from "./columns";
import { AuditLogTableToolbar } from "./AuditLogTableToolbar";

type AuditLogTableProps = {
  data: AuditLogListResult;
  filters: AuditLogFilterInput;
  onFiltersChange: (filters: Partial<AuditLogFilterInput>) => void;
  onRowClick?: (row: AuditLogTableRow) => void;
};

export function AuditLogTable({
  data,
  filters,
  onFiltersChange,
  onRowClick,
}: AuditLogTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createAuditLogColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as AuditLogFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
      }),
    [filters.sortBy, filters.sortOrder, onFiltersChange],
  );

  const isFiltered =
    filters.search.length > 0 ||
    filters.entity.length > 0 ||
    filters.action !== "all";

  return (
    <div className="flex flex-col gap-4">
      <AuditLogTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No audit logs yet"
        emptyDescription="Security and admin actions will appear here once recorded."
        onRowClick={onRowClick}
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as AuditLogFilterInput["sortBy"],
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
