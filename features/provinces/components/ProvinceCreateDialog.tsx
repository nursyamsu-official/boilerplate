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

import { provinceCreateAction } from "../actions/province-create.action";
import { defaultProvinceFormValues } from "../lib/province-form-defaults";
import { mapFormValuesToProvinceCreateInput } from "../lib/province-form-mapper";
import { provinceFormFieldsSchema } from "../schemas/province-create.schema";
import { ProvinceForm } from "./ProvinceForm";

type ProvinceCreateDialogProps = {
  open: boolean;
  countryOptions: CountryOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProvinceCreateDialog({
  open,
  countryOptions,
  onOpenChange,
  onSuccess,
}: ProvinceCreateDialogProps) {
  const defaultValues = {
    ...defaultProvinceFormValues,
    countryId: countryOptions[0]?.id ?? "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create province</DialogTitle>
          <DialogDescription>
            Add a new province under a country.
          </DialogDescription>
        </DialogHeader>

        <ProvinceForm
          key={defaultValues.countryId}
          defaultValues={defaultValues}
          countryOptions={countryOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: provinceFormFieldsSchema,
            action: provinceCreateAction,
            mapInput: mapFormValuesToProvinceCreateInput,
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
