"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { NumberField } from "@/components/form/NumberField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { PermissionModuleFormValues } from "../types/permission-module.type";

type PermissionModuleFormProps = {
  defaultValues: PermissionModuleFormValues;
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<PermissionModuleFormValues, unknown>;
  onCancel: () => void;
};

export function PermissionModuleForm({
  defaultValues,
  isSystem = false,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: PermissionModuleFormProps) {
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
      </FormShell>
    </form>
  );
}
