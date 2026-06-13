"use client";

import { useForm } from "@tanstack/react-form";

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
  userCreateFormFieldsSchema,
  userFormFieldsSchema,
} from "../schemas/user-create.schema";
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
  onSubmit: (values: UserFormValues) => Promise<void>;
  onCancel: () => void;
};

export function UserForm({
  defaultValues,
  roleOptions,
  mode,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed =
        mode === "create"
          ? userCreateFormFieldsSchema.safeParse(value)
          : userFormFieldsSchema.safeParse(value);

      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid form data");
      }

      await onSubmit({
        name: parsed.data.name,
        email: parsed.data.email,
        username: parsed.data.username ?? null,
        phoneNumber: parsed.data.phoneNumber ?? null,
        status: parsed.data.status,
        roleIds: parsed.data.roleIds,
        password: mode === "create" ? value.password : undefined,
      });
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
        <form.Field name="name">
          {(field) => (
            <TextField field={field} label="Name" placeholder="John Doe" />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <TextField
              field={field}
              label="Email"
              placeholder="john@example.com"
              type="email"
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
            />
          )}
        </form.Field>

        <form.Field name="roleIds">
          {(field) => {
            const selectedIds = field.state.value ?? [];
            const hasError =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

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
