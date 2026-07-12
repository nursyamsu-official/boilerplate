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

import { countryUpdateAction } from "../actions/country-update.action";
import { mapFormValuesToCountryUpdateInput } from "../lib/country-form-mapper";
import { countryFormFieldsSchema } from "../schemas/country-create.schema";
import type { CountryFormValues } from "../types/country.type";
import { CountryForm } from "./CountryForm";

type CountryEditDialogProps = {
  open: boolean;
  countryId: string | null;
  defaultValues: CountryFormValues | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function CountryEditDialog({
  open,
  countryId,
  defaultValues,
  onOpenChange,
  onSuccess,
}: CountryEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit country</DialogTitle>
          <DialogDescription>Update country details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && countryId ? (
          <CountryForm
            key={countryId}
            defaultValues={defaultValues}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: countryFormFieldsSchema,
              action: countryUpdateAction,
              mapInput: (values) =>
                mapFormValuesToCountryUpdateInput(countryId, values),
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
