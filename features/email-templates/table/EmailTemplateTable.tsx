"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { EmailTemplateFilterInput } from "../schemas/email-template-filter.schema";
import type {
  EmailTemplateListResult,
  EmailTemplateTableRow,
} from "../types/email-template.type";
import { createEmailTemplateColumns } from "./columns";
import { EmailTemplateTableToolbar } from "./EmailTemplateTableToolbar";

type EmailTemplateTableProps = {
  data: EmailTemplateListResult;
  filters: EmailTemplateFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<EmailTemplateFilterInput>) => void;
  onEdit: (template: EmailTemplateTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function EmailTemplateTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: EmailTemplateTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (template: EmailTemplateTableRow) => {
      if (isEditLoading) return;
      void onEdit(template);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createEmailTemplateColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as EmailTemplateFilterInput["sortBy"],
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
      <EmailTemplateTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No templates yet"
        emptyDescription="Create your first email template to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as EmailTemplateFilterInput["sortBy"],
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
