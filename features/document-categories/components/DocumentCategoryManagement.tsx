"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { documentCategoryGetByIdAction } from "../actions/document-category-update.action";
import { buildDocumentCategoryListUrl } from "../lib/document-category-filter-url";
import { mapDocumentCategoryDetailToFormValues } from "../lib/document-category-form-defaults";
import type { DocumentCategoryFilterInput } from "../schemas/document-category-filter.schema";
import type {
  DocumentCategoryFormValues,
  DocumentCategoryListResult,
  DocumentCategoryTableRow,
} from "../types/document-category.type";
import { DocumentCategoryTable } from "../table/DocumentCategoryTable";
import { DocumentCategoryCreateDialog } from "./DocumentCategoryCreateDialog";
import { DocumentCategoryEditDialog } from "./DocumentCategoryEditDialog";

type DocumentCategoryManagementProps = {
  initialData: DocumentCategoryListResult;
  initialFilters: DocumentCategoryFilterInput;
};

type EditDialogState = {
  categoryId: string;
  defaultValues: DocumentCategoryFormValues | null;
};

export function DocumentCategoryManagement({
  initialData,
  initialFilters,
}: DocumentCategoryManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<DocumentCategoryFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildDocumentCategoryListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (category: DocumentCategoryTableRow) => {
    setEditDialogState({
      categoryId: category.id,
      defaultValues: null,
    });

    try {
      const detail = await documentCategoryGetByIdAction({ id: category.id });
      setEditDialogState({
        categoryId: category.id,
        defaultValues: mapDocumentCategoryDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load category");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Document Categories</h2>
        <p className="text-sm text-muted-foreground">
          Manage document categories.
        </p>
      </div>

      <DocumentCategoryTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <DocumentCategoryCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <DocumentCategoryEditDialog
        open={editDialogState !== null}
        categoryId={editDialogState?.categoryId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogState(null);
          }
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
