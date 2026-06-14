"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { EmailLogFilterInput } from "../schemas/email-log-filter.schema";
import type {
  EmailLogListResult,
  EmailLogTableRow,
} from "../types/email-log.type";
import { createEmailLogColumns } from "./columns";
import { EmailLogTableToolbar } from "./EmailLogTableToolbar";

type EmailLogTableProps = {
  data: EmailLogListResult;
  filters: EmailLogFilterInput;
  onFiltersChange: (filters: Partial<EmailLogFilterInput>) => void;
  onRowClick?: (row: EmailLogTableRow) => void;
};

export function EmailLogTable({
  data,
  filters,
  onFiltersChange,
  onRowClick,
}: EmailLogTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createEmailLogColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EmailLogFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
      }),
    [filters.sortBy, filters.sortOrder, onFiltersChange],
  );

  const isFiltered =
    filters.search.length > 0 || filters.status !== "all";

  return (
    <div className="flex flex-col gap-4">
      <EmailLogTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No email logs yet"
        emptyDescription="Outbound email delivery records will appear here."
        onRowClick={onRowClick}
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EmailLogFilterInput["sortBy"],
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
