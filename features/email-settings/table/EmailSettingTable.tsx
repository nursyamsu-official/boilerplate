"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { EmailSettingFilterInput } from "../schemas/email-setting-filter.schema";
import type {
  EmailSettingListResult,
  EmailSettingTableRow,
} from "../types/email-setting.type";
import { createEmailSettingColumns } from "./columns";
import { EmailSettingTableToolbar } from "./EmailSettingTableToolbar";

type EmailSettingTableProps = {
  data: EmailSettingListResult;
  filters: EmailSettingFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<EmailSettingFilterInput>) => void;
  onEdit: (setting: EmailSettingTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function EmailSettingTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: EmailSettingTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (setting: EmailSettingTableRow) => {
      if (isEditLoading) return;
      void onEdit(setting);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createEmailSettingColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EmailSettingFilterInput["sortBy"],
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
    filters.provider !== "all";

  return (
    <div className="flex flex-col gap-4">
      <EmailSettingTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No email settings yet"
        emptyDescription="Create your first provider configuration to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EmailSettingFilterInput["sortBy"],
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
