"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { CountryOption } from "@/features/countries";
import type { ProvinceOption } from "@/features/provinces";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import { districtGetProvinceOptionsAction } from "../actions/district-update.action";
import type { DistrictFormValues } from "../types/district.type";

type DistrictFormProps = {
  defaultValues: DistrictFormValues;
  countryOptions: CountryOption[];
  initialProvinceOptions?: ProvinceOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<DistrictFormValues, unknown>;
  onCancel: () => void;
};

export function DistrictForm({
  defaultValues,
  countryOptions,
  initialProvinceOptions = [],
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: DistrictFormProps) {
  const { onSubmitAsync, onSubmit } = useFormActionSubmit(submitConfig);
  const [provinceOptions, setProvinceOptions] =
    useState<ProvinceOption[]>(initialProvinceOptions);
  const [isLoadingProvinceOptions, setIsLoadingProvinceOptions] = useState(false);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync,
    },
    onSubmit: async () => {
      await onSubmit();
    },
  });

  const loadProvinceOptions = useCallback(
    async (countryId: string) => {
      if (!countryId) {
        setProvinceOptions([]);
        form.setFieldValue("provinceId", "");
        return;
      }

      setIsLoadingProvinceOptions(true);

      try {
        const options = await districtGetProvinceOptionsAction({ countryId });
        setProvinceOptions(options);

        const currentProvinceId = form.getFieldValue("provinceId");
        const hasCurrent = options.some(
          (option) => option.id === currentProvinceId,
        );

        if (!hasCurrent) {
          form.setFieldValue("provinceId", options[0]?.id ?? "");
        }
      } finally {
        setIsLoadingProvinceOptions(false);
      }
    },
    [form],
  );

  useEffect(() => {
    if (defaultValues.countryId) {
      void loadProvinceOptions(defaultValues.countryId);
    }
  }, [defaultValues.countryId, loadProvinceOptions]);

  const formActions = (
    <>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                {pendingLabel}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        )}
      </form.Subscribe>
    </>
  );

  return (
    <form
      className={getFormClassName(layout)}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <FormShell layout={layout} actions={formActions}>
        <FieldGroup>
          <FormSubmitError form={form as never} />
          <form.Field
            name="countryId"
            listeners={{
              onChange: ({ value }) => {
                void loadProvinceOptions(String(value ?? ""));
              },
            }}
          >
            {(field) => (
              <SelectField
                field={field}
                label="Country"
                placeholder="Select country"
                required
                options={countryOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field name="provinceId">
            {(field) => (
              <SelectField
                field={field}
                label="Province"
                placeholder={
                  isLoadingProvinceOptions
                    ? "Loading provinces..."
                    : "Select province"
                }
                required
                disabled={isLoadingProvinceOptions || provinceOptions.length === 0}
                options={provinceOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field name="code">
            {(field) => (
              <TextField
                field={field}
                label="Code"
                description="Lowercase letters, numbers, and underscores only."
                placeholder="jakarta_pusat"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Jakarta Pusat"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the district"
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive districts are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
