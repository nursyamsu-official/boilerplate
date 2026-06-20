"use client";

import { useForm } from "@tanstack/react-form";

import { SelectField } from "@/components/form/SelectField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { PermissionModuleOption } from "@/features/permission-modules";
import { mapZodErrorToFormFieldErrors } from "@/lib/zod-form-validator";

import { permissionFormFieldsSchema } from "../schemas/permission-create.schema";
import type { PermissionFormValues } from "../types/permission.type";

type PermissionFormProps = {
  defaultValues: PermissionFormValues;
  moduleOptions: PermissionModuleOption[];
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: PermissionFormValues) => Promise<void>;
  onCancel: () => void;
};

export function PermissionForm({
  defaultValues,
  moduleOptions,
  isSystem = false,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: PermissionFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync: async ({ value }) => {
        const parsed = permissionFormFieldsSchema.safeParse(value);

        if (parsed.success) {
          return null;
        }

        return mapZodErrorToFormFieldErrors(parsed.error);
      },
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
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

      <div className="flex justify-end gap-2">
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
      </div>
    </form>
  );
}
