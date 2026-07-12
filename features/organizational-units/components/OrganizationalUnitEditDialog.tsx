"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CompanyOption } from "@/features/companies";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { organizationalUnitUpdateAction } from "../actions/organizational-unit-update.action";
import { mapFormValuesToOrganizationalUnitUpdateInput } from "../lib/organizational-unit-form-mapper";
import { organizationalUnitFormFieldsSchema } from "../schemas/organizational-unit-create.schema";
import type {
  OrganizationalUnitFormValues,
  OrganizationalUnitParentOption,
} from "../types/organizational-unit.type";
import { OrganizationalUnitForm } from "./OrganizationalUnitForm";

type OrganizationalUnitEditDialogProps = {
  open: boolean;
  unitId: string | null;
  defaultValues: OrganizationalUnitFormValues | null;
  companyOptions: CompanyOption[];
  parentOptions: OrganizationalUnitParentOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function OrganizationalUnitEditDialog({
  open,
  unitId,
  defaultValues,
  companyOptions,
  parentOptions,
  onOpenChange,
  onSuccess,
}: OrganizationalUnitEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit organizational unit</DialogTitle>
          <DialogDescription>
            Update unit details and hierarchy.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && unitId ? (
          <OrganizationalUnitForm
            key={unitId}
            defaultValues={defaultValues}
            companyOptions={companyOptions}
            excludeUnitId={unitId}
            initialParentOptions={parentOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: organizationalUnitFormFieldsSchema,
              action: organizationalUnitUpdateAction,
              mapInput: (values) =>
                mapFormValuesToOrganizationalUnitUpdateInput(unitId, values),
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
          <FormDialogSkeleton fields={7} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
