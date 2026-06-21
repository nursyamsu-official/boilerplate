"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SelectField } from "@/components/form/SelectField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { PermissionModuleOption } from "@/features/permission-modules";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { PermissionFormValues } from "../types/permission.type";

type PermissionFormProps = {
  defaultValues: PermissionFormValues;
  moduleOptions: PermissionModuleOption[];
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<PermissionFormValues, unknown>;
  onCancel: () => void;
};

export function PermissionForm({
  defaultValues,
  moduleOptions,
  isSystem = false,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: PermissionFormProps) {
  const { onSubmitAsync, onSubmit } = useFormActionSubmit(submitConfig);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync,
    },
    onSubmit: async () => {
      await onSubmit();
    },
  });

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
        <form.Field name="code">
          {(field) => (
            <TextField
              field={field}
              label="Code"
              description="Lowercase letters, numbers, and underscores only."
              placeholder="user_view"
              disabled={isSystem}
              required
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label="Name"
              placeholder="View users"
              required
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              field={field}
              label="Description"
              placeholder="Allows viewing the user list"
            />
          )}
        </form.Field>

        <form.Field name="moduleId">
          {(field) => (
            <SelectField
              field={field}
              label="Module"
              allowEmpty
              emptyLabel="No module"
              placeholder="Select module"
              options={moduleOptions.map((option) => ({
                value: option.id,
                label: `${option.name} (${option.code})`,
              }))}
            />
          )}
        </form.Field>
      </FieldGroup>
      </FormShell>
    </form>
  );
}
