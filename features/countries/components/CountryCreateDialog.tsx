"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { countryCreateAction } from "../actions/country-create.action";
import { defaultCountryFormValues } from "../lib/country-form-defaults";
import { mapFormValuesToCountryCreateInput } from "../lib/country-form-mapper";
import { countryFormFieldsSchema } from "../schemas/country-create.schema";
import { CountryForm } from "./CountryForm";

type CountryCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function CountryCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: CountryCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create country</DialogTitle>
          <DialogDescription>
            Add a new country to the address hierarchy.
          </DialogDescription>
        </DialogHeader>

        <CountryForm
          defaultValues={defaultCountryFormValues}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: countryFormFieldsSchema,
            action: countryCreateAction,
            mapInput: mapFormValuesToCountryCreateInput,
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
