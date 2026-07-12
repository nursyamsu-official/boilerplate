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

import { companyUpdateAction } from "../actions/company-update.action";
import { mapFormValuesToCompanyUpdateInput } from "../lib/company-form-mapper";
import { companyFormFieldsSchema } from "../schemas/company-create.schema";
import type { CompanyFormValues } from "../types/company.type";
import { CompanyForm } from "./CompanyForm";

type CompanyEditDialogProps = {
  open: boolean;
  companyId: string | null;
  defaultValues: CompanyFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function CompanyEditDialog({
  open,
  companyId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: CompanyEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit company</DialogTitle>
          <DialogDescription>Update company details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && companyId ? (
          <CompanyForm
            key={companyId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: companyFormFieldsSchema,
              action: companyUpdateAction,
              mapInput: (values) =>
                mapFormValuesToCompanyUpdateInput(companyId, values),
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
