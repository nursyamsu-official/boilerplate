"use client";

import { useForm } from "@tanstack/react-form";

import { NumberField } from "@/components/form/NumberField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { mapZodErrorToFormFieldErrors } from "@/lib/zod-form-validator";

import { permissionModuleFormFieldsSchema } from "../schemas/permission-module-create.schema";
import type { PermissionModuleFormValues } from "../types/permission-module.type";

type PermissionModuleFormProps = {
  defaultValues: PermissionModuleFormValues;
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: PermissionModuleFormValues) => Promise<void>;
  onCancel: () => void;
};

export function PermissionModuleForm({
  defaultValues,
  isSystem = false,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: PermissionModuleFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync: async ({ value }) => {
        const parsed = permissionModuleFormFieldsSchema.safeParse(value);

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
              placeholder="user_management"
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
              placeholder="User Management"
              required
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              field={field}
              label="Description"
              placeholder="Manage users and their access"
            />
          )}
        </form.Field>

        <form.Field name="icon">
          {(field) => (
            <TextField
              field={field}
              label="Icon"
              description="Optional Lucide icon name."
              placeholder="Users"
            />
          )}
        </form.Field>

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
              description="Inactive modules are hidden from permission forms."
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
