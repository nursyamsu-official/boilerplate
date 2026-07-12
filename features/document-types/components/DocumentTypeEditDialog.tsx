"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DocumentCategoryOption } from "@/features/document-categories";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { documentTypeUpdateAction } from "../actions/document-type-update.action";
import { mapFormValuesToDocumentTypeUpdateInput } from "../lib/document-type-form-mapper";
import { documentTypeFormFieldsSchema } from "../schemas/document-type-create.schema";
import type { DocumentTypeFormValues } from "../types/document-type.type";
import { DocumentTypeForm } from "./DocumentTypeForm";

type DocumentTypeEditDialogProps = {
  open: boolean;
  documentTypeId: string | null;
  defaultValues: DocumentTypeFormValues | null;
  categoryOptions: DocumentCategoryOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function DocumentTypeEditDialog({
  open,
  documentTypeId,
  defaultValues,
  categoryOptions,
  onOpenChange,
  onSuccess,
}: DocumentTypeEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit document type</DialogTitle>
          <DialogDescription>
            Update document type details and number range.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && documentTypeId ? (
          <DocumentTypeForm
            key={documentTypeId}
            defaultValues={defaultValues}
            categoryOptions={categoryOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: documentTypeFormFieldsSchema,
              action: documentTypeUpdateAction,
              mapInput: (values) =>
                mapFormValuesToDocumentTypeUpdateInput(documentTypeId, values),
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
          <FormDialogSkeleton fields={10} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
