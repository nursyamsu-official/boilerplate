"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { hasFieldValidationError } from "@/components/form/field-utils";
import { SelectField } from "@/components/form/SelectField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { RoleOption } from "@/features/roles";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { UserFormValues } from "../types/user.type";

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BANNED", label: "Banned" },
];

type UserFormProps = {
  defaultValues: UserFormValues;
  roleOptions: RoleOption[];
  mode: "create" | "edit";
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<UserFormValues, unknown>;
  onCancel: () => void;
};

export function UserForm({
  defaultValues,
  roleOptions,
  mode,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: UserFormProps) {
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
        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label="Name"
              placeholder="John Doe"
              required
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <TextField
              field={field}
              label="Email"
              placeholder="john@example.com"
              type="email"
              required
            />
          )}
        </form.Field>

        {mode === "create" ? (
          <form.Field name="password">
            {(field) => (
              <TextField
                field={field}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
                required
              />
            )}
          </form.Field>
        ) : null}

        <form.Field name="username">
          {(field) => (
            <TextField
              field={field}
              label="Username"
              description="Optional. Letters, numbers, and underscores only."
              placeholder="johndoe"
            />
          )}
        </form.Field>

        <form.Field name="phoneNumber">
          {(field) => (
            <TextField
              field={field}
              label="Phone number"
              placeholder="+62..."
            />
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <SelectField
              field={field}
              label="Status"
              options={statusOptions}
              required
            />
          )}
        </form.Field>

        <form.Field name="roleIds">
          {(field) => {
            const selectedIds = field.state.value ?? [];
            const hasError = hasFieldValidationError(field);

            const toggleRole = (roleId: string, checked: boolean) => {
              const nextIds = checked
                ? [...selectedIds, roleId]
                : selectedIds.filter((id: string) => id !== roleId);

              field.handleChange(nextIds);
            };

            return (
              <Field data-invalid={hasError || undefined}>
                <FieldContent>
                  <FieldLabel>Roles</FieldLabel>
                  <FieldDescription>
                    Assign one or more active roles to this user.
                  </FieldDescription>
                  {hasError ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : null}
                </FieldContent>

                <div className="flex max-h-56 flex-col gap-2 overflow-y-auto rounded-lg border p-3">
                  {roleOptions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No active roles available.
                    </p>
                  ) : (
                    roleOptions.map((role) => {
                      const checkboxId = `${field.name}-${role.id}`;
                      const isChecked = selectedIds.includes(role.id);

                      return (
                        <label
                          key={role.id}
                          htmlFor={checkboxId}
                          className="flex items-start gap-2 rounded-md border p-2 text-sm"
                        >
                          <Checkbox
                            id={checkboxId}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              toggleRole(role.id, checked === true)
                            }
                            onBlur={field.handleBlur}
                            className="mt-0.5"
                          />
                          <span className="min-w-0">
                            <span className="block font-medium">{role.name}</span>
                            <span className="block font-mono text-xs text-muted-foreground">
                              {role.code}
                            </span>
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      </FormShell>
    </form>
  );
}
