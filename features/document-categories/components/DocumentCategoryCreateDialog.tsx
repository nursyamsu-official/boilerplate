"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { documentCategoryCreateAction } from "../actions/document-category-create.action";
import { defaultDocumentCategoryFormValues } from "../lib/document-category-form-defaults";
import { mapFormValuesToDocumentCategoryCreateInput } from "../lib/document-category-form-mapper";
import { documentCategoryFormFieldsSchema } from "../schemas/document-category-create.schema";
import { DocumentCategoryForm } from "./DocumentCategoryForm";

type DocumentCategoryCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function DocumentCategoryCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: DocumentCategoryCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Add a new document category.
          </DialogDescription>
        </DialogHeader>

        <DocumentCategoryForm
          defaultValues={defaultDocumentCategoryFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: documentCategoryFormFieldsSchema,
            action: documentCategoryCreateAction,
            mapInput: mapFormValuesToDocumentCategoryCreateInput,
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
