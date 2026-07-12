"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { companyCreateAction } from "../actions/company-create.action";
import { defaultCompanyFormValues } from "../lib/company-form-defaults";
import { mapFormValuesToCompanyCreateInput } from "../lib/company-form-mapper";
import { companyFormFieldsSchema } from "../schemas/company-create.schema";
import { CompanyForm } from "./CompanyForm";

type CompanyCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function CompanyCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: CompanyCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create company</DialogTitle>
          <DialogDescription>
            Add a new company to the organization structure.
          </DialogDescription>
        </DialogHeader>

        <CompanyForm
          defaultValues={defaultCompanyFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: companyFormFieldsSchema,
            action: companyCreateAction,
            mapInput: mapFormValuesToCompanyCreateInput,
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
