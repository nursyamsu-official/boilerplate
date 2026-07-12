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
import { createDialogSubmitSuccessHandler } from "@/lib/use-form-action-submit";

import { provinceUpdateAction } from "../actions/province-update.action";
import { mapFormValuesToProvinceUpdateInput } from "../lib/province-form-mapper";
import { provinceFormFieldsSchema } from "../schemas/province-create.schema";
import type { ProvinceFormValues } from "../types/province.type";
import { ProvinceForm } from "./ProvinceForm";

type ProvinceEditDialogProps = {
  open: boolean;
  provinceId: string | null;
  defaultValues: ProvinceFormValues | null;
  countryOptions: CountryOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function ProvinceEditDialog({
  open,
  provinceId,
  defaultValues,
  countryOptions,
  onOpenChange,
  onSuccess,
}: ProvinceEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit province</DialogTitle>
          <DialogDescription>Update province details and status.</DialogDescription>
        </DialogHeader>

        {defaultValues && provinceId ? (
          <ProvinceForm
            key={provinceId}
            defaultValues={defaultValues}
            countryOptions={countryOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: provinceFormFieldsSchema,
              action: provinceUpdateAction,
              mapInput: (values) =>
                mapFormValuesToProvinceUpdateInput(provinceId, values),
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
          <FormDialogSkeleton fields={5} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
