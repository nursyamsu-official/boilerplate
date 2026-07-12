"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CountryOption } from "@/features/countries";
import type { ProvinceOption } from "@/features/provinces";
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { districtUpdateAction } from "../actions/district-update.action";
import { mapFormValuesToDistrictUpdateInput } from "../lib/district-form-mapper";
import { districtFormFieldsSchema } from "../schemas/district-create.schema";
import type { DistrictFormValues } from "../types/district.type";
import { DistrictForm } from "./DistrictForm";

type DistrictEditDialogProps = {
  open: boolean;
  districtId: string | null;
  defaultValues: DistrictFormValues | null;
  countryOptions: CountryOption[];
  initialProvinceOptions?: ProvinceOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function DistrictEditDialog({
  open,
  districtId,
  defaultValues,
  countryOptions,
  initialProvinceOptions = [],
  onOpenChange,
  onSuccess,
}: DistrictEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit district</DialogTitle>
          <DialogDescription>Update district details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && districtId ? (
          <DistrictForm
            key={districtId}
            defaultValues={defaultValues}
            countryOptions={countryOptions}
            initialProvinceOptions={initialProvinceOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: districtFormFieldsSchema,
              action: districtUpdateAction,
              mapInput: (values) =>
                mapFormValuesToDistrictUpdateInput(districtId, values),
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
          <FormDialogSkeleton fields={6} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
