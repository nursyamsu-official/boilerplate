"use client";

import { useForm } from "@tanstack/react-form";

import { NumberField } from "@/components/form/NumberField";
import { IconComboboxField } from "@/components/form/IconComboboxField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { mergeMenuLucideIconOptions } from "../lib/menu-lucide-icon";
import { menuFormFieldsSchema } from "../schemas/menu-create.schema";
import type { MenuFormValues, MenuParentOption } from "../types/menu.type";

type MenuFormProps = {
  defaultValues: MenuFormValues;
  parentOptions: MenuParentOption[];
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: MenuFormValues) => Promise<void>;
  onCancel: () => void;
};

export function MenuForm({
  defaultValues,
  parentOptions,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = menuFormFieldsSchema.safeParse(value);
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
              placeholder="dashboard_menus"
            />
          )}
        </form.Field>

        <form.Field name="label">
          {(field) => (
            <TextField field={field} label="Label" placeholder="Menu Management" />
          )}
        </form.Field>

        <form.Field name="path">
          {(field) => (
            <TextField
              field={field}
              label="Path"
              placeholder="/dashboard/admin-page/menus"
            />
          )}
        </form.Field>

        <form.Field name="icon">
          {(field) => (
            <IconComboboxField
              field={field}
              options={mergeMenuLucideIconOptions(defaultValues.icon)}
              label="Icon"
              description="Search and select a Lucide icon."
              allowEmpty
              emptyLabel="No icon"
            />
          )}
        </form.Field>

        <form.Field name="parentId">
          {(field) => (
            <SelectField
              field={field}
              label="Parent menu"
              allowEmpty
              emptyLabel="No parent"
              placeholder="Select parent menu"
              options={parentOptions.map((option) => ({
                value: option.id,
                label: `${option.label} (${option.code})`,
              }))}
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
              description="Inactive menus can be hidden from navigation."
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
