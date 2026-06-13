"use client";

import { useForm } from "@tanstack/react-form";

import { SwitchField } from "@/components/form/SwitchField";
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

import type { PermissionOptionGroup } from "@/features/permissions";

import { roleFormFieldsSchema } from "../schemas/role-create.schema";
import type { RoleFormValues } from "../types/role.type";

type RoleFormProps = {
  defaultValues: RoleFormValues;
  permissionOptionGroups: PermissionOptionGroup[];
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: RoleFormValues) => Promise<void>;
  onCancel: () => void;
};

export function RoleForm({
  defaultValues,
  permissionOptionGroups,
  isSystem = false,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: RoleFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = roleFormFieldsSchema.safeParse(value);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid form data");
      }

      await onSubmit(parsed.data);
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
              placeholder="admin"
              disabled={isSystem}
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField field={field} label="Name" placeholder="Administrator" />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              field={field}
              label="Description"
              placeholder="Full system access"
            />
          )}
        </form.Field>

        <form.Field name="isActive">
          {(field) => (
            <SwitchField
              field={field}
              label="Active"
              description="Inactive roles cannot be assigned to users."
            />
          )}
        </form.Field>

        <form.Field name="permissionIds">
          {(field) => {
            const selectedIds = field.state.value ?? [];
            const hasError =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            const togglePermission = (permissionId: string, checked: boolean) => {
              const nextIds = checked
                ? [...selectedIds, permissionId]
                : selectedIds.filter((id) => id !== permissionId);

              field.handleChange(nextIds);
            };

            return (
              <Field data-invalid={hasError || undefined}>
                <FieldContent>
                  <FieldLabel>Permissions</FieldLabel>
                  <FieldDescription>
                    Select permissions grouped by module.
                  </FieldDescription>
                  {hasError ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : null}
                </FieldContent>

                <div className="flex max-h-72 flex-col gap-4 overflow-y-auto rounded-lg border p-3">
                  {permissionOptionGroups.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No permissions available.
                    </p>
                  ) : (
                    permissionOptionGroups.map((group) => (
                      <div key={group.moduleId ?? group.moduleName} className="space-y-2">
                        <p className="text-sm font-medium">{group.moduleName}</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {group.permissions.map((permission) => {
                            const checkboxId = `${field.name}-${permission.id}`;
                            const isChecked = selectedIds.includes(permission.id);

                            return (
                              <label
                                key={permission.id}
                                htmlFor={checkboxId}
                                className="flex items-start gap-2 rounded-md border p-2 text-sm"
                              >
                                <Checkbox
                                  id={checkboxId}
                                  checked={isChecked}
                                  onCheckedChange={(checked) =>
                                    togglePermission(permission.id, checked === true)
                                  }
                                  onBlur={field.handleBlur}
                                  className="mt-0.5"
                                />
                                <span className="min-w-0">
                                  <span className="block font-medium">
                                    {permission.name}
                                  </span>
                                  <span className="block font-mono text-xs text-muted-foreground">
                                    {permission.code}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))
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
