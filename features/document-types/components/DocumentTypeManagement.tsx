"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { DocumentCategoryOption } from "@/features/document-categories";

import { documentTypeGetByIdAction } from "../actions/document-type-update.action";
import { buildDocumentTypeListUrl } from "../lib/document-type-filter-url";
import { mapDocumentTypeDetailToFormValues } from "../lib/document-type-form-defaults";
import type { DocumentTypeFilterInput } from "../schemas/document-type-filter.schema";
import type {
  DocumentTypeFormValues,
  DocumentTypeListResult,
  DocumentTypeTableRow,
} from "../types/document-type.type";
import { DocumentTypeTable } from "../table/DocumentTypeTable";
import { DocumentTypeCreateDialog } from "./DocumentTypeCreateDialog";
import { DocumentTypeEditDialog } from "./DocumentTypeEditDialog";

type DocumentTypeManagementProps = {
  initialData: DocumentTypeListResult;
  initialFilters: DocumentTypeFilterInput;
  categoryOptions: DocumentCategoryOption[];
};

type EditDialogState = {
  documentTypeId: string;
  defaultValues: DocumentTypeFormValues | null;
};

export function DocumentTypeManagement({
  initialData,
  initialFilters,
  categoryOptions,
}: DocumentTypeManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<DocumentTypeFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildDocumentTypeListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (documentType: DocumentTypeTableRow) => {
    setEditDialogState({
      documentTypeId: documentType.id,
      defaultValues: null,
    });

    try {
      const detail = await documentTypeGetByIdAction({ id: documentType.id });
      setEditDialogState({
        documentTypeId: documentType.id,
        defaultValues: mapDocumentTypeDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load document type");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Document Types</h2>
        <p className="text-sm text-muted-foreground">
          Manage document types and number ranges.
        </p>
      </div>

      <DocumentTypeTable
        data={initialData}
        filters={initialFilters}
        categoryOptions={categoryOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <DocumentTypeCreateDialog
        open={isCreateOpen}
        categoryOptions={categoryOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <DocumentTypeEditDialog
        open={editDialogState !== null}
        documentTypeId={editDialogState?.documentTypeId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        categoryOptions={categoryOptions}
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
