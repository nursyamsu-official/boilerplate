"use client";

import { useForm } from "@tanstack/react-form";

import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { apiKeyFormFieldsSchema } from "../schemas/api-key.schema";
import type { ApiKeyFormValues } from "../types/api-key.type";
import type { UserOption } from "@/features/users";

type ApiKeyFormProps = {
  defaultValues: ApiKeyFormValues;
  userOptions: UserOption[];
  submitLabel: string;
  pendingLabel: string;
  showStatusField?: boolean;
  onSubmit: (values: ApiKeyFormValues) => Promise<void>;
  onCancel: () => void;
};

export function ApiKeyForm({
  defaultValues,
  userOptions,
  submitLabel,
  pendingLabel,
  showStatusField = false,
  onSubmit,
  onCancel,
}: ApiKeyFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = apiKeyFormFieldsSchema.safeParse(value);
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
        <form.Field name="userId">
          {(field) => (
            <SelectField
              field={field}
              label="User"
              placeholder="Select a user"
              options={userOptions.map((user) => ({
                value: user.id,
                label: `${user.name} (${user.email})`,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField field={field} label="Name" placeholder="Production API key" />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              field={field}
              label="Description"
              placeholder="Optional description"
            />
          )}
        </form.Field>

        <form.Field name="scopes">
          {(field) => (
            <TextField
              field={field}
              label="Scopes"
              description="Optional comma-separated scopes or JSON string."
              placeholder="read,write"
            />
          )}
        </form.Field>

        <form.Field name="expiresAt">
          {(field) => (
            <TextField
              field={field}
              label="Expires at"
              description="Optional expiration date."
              type="date"
            />
          )}
        </form.Field>

        {showStatusField ? (
          <form.Field name="isActive">
            {(field) => (
              <SwitchField field={field} label="Active" description="Enable or disable this API key." />
            )}
          </form.Field>
        ) : null}
      </FieldGroup>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
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
