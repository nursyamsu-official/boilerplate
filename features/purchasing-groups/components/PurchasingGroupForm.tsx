"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import {
  FormShell,
  getFormClassName,
} from "@/components/form/form-dialog-layout";
import { NumberField } from "@/components/form/NumberField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { CompanyOption } from "@/features/companies";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import { purchasingGroupGetParentOptionsAction } from "../actions/purchasing-group-delete.action";
import type {
  PurchasingGroupFormValues,
  PurchasingGroupParentOption,
} from "../types/purchasing-group.type";

type PurchasingGroupFormProps = {
  defaultValues: PurchasingGroupFormValues;
  companyOptions: CompanyOption[];
  excludeUnitId?: string;
  initialParentOptions?: PurchasingGroupParentOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<PurchasingGroupFormValues, unknown>;
  onCancel: () => void;
};

export function PurchasingGroupForm({
  defaultValues,
  companyOptions,
  excludeUnitId,
  initialParentOptions = [],
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: PurchasingGroupFormProps) {
  const { onSubmitAsync, onSubmit } = useFormActionSubmit(submitConfig);
  const [parentOptions, setParentOptions] =
    useState<PurchasingGroupParentOption[]>(initialParentOptions);
  const [isLoadingParentOptions, setIsLoadingParentOptions] = useState(false);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync,
    },
    onSubmit: async () => {
      await onSubmit();
    },
  });

  const loadParentOptions = useCallback(
    async (companyId: string) => {
      if (!companyId) {
        setParentOptions([]);
        form.setFieldValue("parentId", null);
        return;
      }

      setIsLoadingParentOptions(true);

      try {
        const options = await purchasingGroupGetParentOptionsAction({
          companyId,
          excludeUnitId,
        });
        setParentOptions(options);

        const currentParentId = form.getFieldValue("parentId");
        if (
          currentParentId &&
          !options.some((option) => option.id === currentParentId)
        ) {
          form.setFieldValue("parentId", null);
        }
      } catch {
        setParentOptions([]);
        form.setFieldValue("parentId", null);
      } finally {
        setIsLoadingParentOptions(false);
      }
    },
    [excludeUnitId, form],
  );

  useEffect(() => {
    if (defaultValues.companyId) {
      void loadParentOptions(defaultValues.companyId);
    }
  }, [defaultValues.companyId, loadParentOptions]);

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
            name="companyId"
            listeners={{
              onChange: ({ value }) => {
                void loadParentOptions(String(value ?? ""));
              },
            }}
          >
            {(field) => (
              <SelectField
                field={field}
                label="Company"
                placeholder="Select company"
                required
                options={companyOptions.map((option) => ({
                  value: option.id,
                  label: `${option.name} (${option.code})`,
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
                placeholder="finance_dept"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Finance Department"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the Purchasing Group"
              />
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.values.companyId}>
            {(companyId) => (
              <form.Field name="parentId">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Parent unit"
                    allowEmpty
                    emptyLabel="No parent"
                    placeholder={
                      companyId
                        ? isLoadingParentOptions
                          ? "Loading parent units..."
                          : "Select parent unit"
                        : "Select a company first"
                    }
                    disabled={!companyId || isLoadingParentOptions}
                    options={parentOptions.map((option) => ({
                      value: option.id,
                      label: `${option.name} (${option.code})`,
                    }))}
                  />
                )}
              </form.Field>
            )}
          </form.Subscribe>

          <form.Field name="sortOrder">
            {(field) => (
              <NumberField
                field={field}
                label="Sort order"
                description="Lower numbers appear first."
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive units are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
