"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { documentCategoryUpdateAction } from "../actions/document-category-update.action";
import { mapFormValuesToDocumentCategoryUpdateInput } from "../lib/document-category-form-mapper";
import { documentCategoryFormFieldsSchema } from "../schemas/document-category-create.schema";
import type { DocumentCategoryFormValues } from "../types/document-category.type";
import { DocumentCategoryForm } from "./DocumentCategoryForm";

type DocumentCategoryEditDialogProps = {
  open: boolean;
  categoryId: string | null;
  defaultValues: DocumentCategoryFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function DocumentCategoryEditDialog({
  open,
  categoryId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: DocumentCategoryEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>Update category details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && categoryId ? (
          <DocumentCategoryForm
            key={categoryId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: documentCategoryFormFieldsSchema,
              action: documentCategoryUpdateAction,
              mapInput: (values) =>
                mapFormValuesToDocumentCategoryUpdateInput(categoryId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: createDialogSubmitSuccessHandler(
                onOpenChange,
                onSuccess,
              ),
            }}
          />
        ) : (
          <FormDialogSkeleton fields={4} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
