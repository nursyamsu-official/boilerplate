"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { DocumentCategoryOption } from "@/features/document-categories";

import type { DocumentTypeFilterInput } from "../schemas/document-type-filter.schema";
import type {
  DocumentTypeListResult,
  DocumentTypeTableRow,
} from "../types/document-type.type";
import { createDocumentTypeColumns } from "./columns";
import { DocumentTypeTableToolbar } from "./DocumentTypeTableToolbar";

type DocumentTypeTableProps = {
  data: DocumentTypeListResult;
  filters: DocumentTypeFilterInput;
  categoryOptions: DocumentCategoryOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<DocumentTypeFilterInput>) => void;
  onEdit: (documentType: DocumentTypeTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function DocumentTypeTable({
  data,
  filters,
  categoryOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: DocumentTypeTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (documentType: DocumentTypeTableRow) => {
      if (isEditLoading) return;
      void onEdit(documentType);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createDocumentTypeColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as DocumentTypeFilterInput["sortBy"],
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
    filters.categoryId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <DocumentTypeTableToolbar
        filters={filters}
        categoryOptions={categoryOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No document types yet"
        emptyDescription="Create your first document type to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as DocumentTypeFilterInput["sortBy"],
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
