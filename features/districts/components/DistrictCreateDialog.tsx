"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CountryOption } from "@/features/countries";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { districtCreateAction } from "../actions/district-create.action";
import { defaultDistrictFormValues } from "../lib/district-form-defaults";
import { mapFormValuesToDistrictCreateInput } from "../lib/district-form-mapper";
import { districtFormFieldsSchema } from "../schemas/district-create.schema";
import { DistrictForm } from "./DistrictForm";

type DistrictCreateDialogProps = {
  open: boolean;
  countryOptions: CountryOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function DistrictCreateDialog({
  open,
  countryOptions,
  onOpenChange,
  onSuccess,
}: DistrictCreateDialogProps) {
  const defaultValues = {
    ...defaultDistrictFormValues,
    countryId: countryOptions[0]?.id ?? "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create district</DialogTitle>
          <DialogDescription>
            Add a new district under a province.
          </DialogDescription>
        </DialogHeader>

        <DistrictForm
          key={defaultValues.countryId}
          defaultValues={defaultValues}
          countryOptions={countryOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: districtFormFieldsSchema,
            action: districtCreateAction,
            mapInput: mapFormValuesToDistrictCreateInput,
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
