"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DocumentCategoryOption } from "@/features/document-categories";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { documentTypeCreateAction } from "../actions/document-type-create.action";
import { defaultDocumentTypeFormValues } from "../lib/document-type-form-defaults";
import { mapFormValuesToDocumentTypeCreateInput } from "../lib/document-type-form-mapper";
import { documentTypeFormFieldsSchema } from "../schemas/document-type-create.schema";
import { DocumentTypeForm } from "./DocumentTypeForm";

type DocumentTypeCreateDialogProps = {
  open: boolean;
  categoryOptions: DocumentCategoryOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function DocumentTypeCreateDialog({
  open,
  categoryOptions,
  onOpenChange,
  onSuccess,
}: DocumentTypeCreateDialogProps) {
  const defaultValues = {
    ...defaultDocumentTypeFormValues,
    categoryId: categoryOptions[0]?.id ?? "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create document type</DialogTitle>
          <DialogDescription>
            Add a new document type under a category.
          </DialogDescription>
        </DialogHeader>

        <DocumentTypeForm
          key={defaultValues.categoryId}
          defaultValues={defaultValues}
          categoryOptions={categoryOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: documentTypeFormFieldsSchema,
            action: documentTypeCreateAction,
            mapInput: mapFormValuesToDocumentTypeCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: createDialogSubmitSuccessHandler(onOpenChange, onSuccess),
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
