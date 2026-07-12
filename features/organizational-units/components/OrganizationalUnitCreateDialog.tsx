"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CompanyOption } from "@/features/companies";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { organizationalUnitCreateAction } from "../actions/organizational-unit-create.action";
import { defaultOrganizationalUnitFormValues } from "../lib/organizational-unit-form-defaults";
import { mapFormValuesToOrganizationalUnitCreateInput } from "../lib/organizational-unit-form-mapper";
import { organizationalUnitFormFieldsSchema } from "../schemas/organizational-unit-create.schema";
import { OrganizationalUnitForm } from "./OrganizationalUnitForm";

type OrganizationalUnitCreateDialogProps = {
  open: boolean;
  companyOptions: CompanyOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function OrganizationalUnitCreateDialog({
  open,
  companyOptions,
  onOpenChange,
  onSuccess,
}: OrganizationalUnitCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create organizational unit</DialogTitle>
          <DialogDescription>
            Add a new unit to your organization hierarchy.
          </DialogDescription>
        </DialogHeader>

        <OrganizationalUnitForm
          defaultValues={defaultOrganizationalUnitFormValues}
          companyOptions={companyOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: organizationalUnitFormFieldsSchema,
            action: organizationalUnitCreateAction,
            mapInput: mapFormValuesToOrganizationalUnitCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: createDialogSubmitSuccessHandler(
              onOpenChange,
              onSuccess,
            ),
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
