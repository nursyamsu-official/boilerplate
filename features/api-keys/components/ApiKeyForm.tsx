"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { UserOption } from "@/features/users";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { ApiKeyFormValues } from "../types/api-key.type";

type ApiKeyFormProps = {
  defaultValues: ApiKeyFormValues;
  userOptions: UserOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  showStatusField?: boolean;
  submitConfig: FormActionSubmitConfig<ApiKeyFormValues, unknown>;
  onCancel: () => void;
};

export function ApiKeyForm({
  defaultValues,
  userOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  showStatusField = false,
  submitConfig,
  onCancel,
}: ApiKeyFormProps) {
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
        <form.Field name="userId">
          {(field) => (
            <SelectField
              field={field}
              label="User"
              placeholder="Select a user"
              required
              options={userOptions.map((user) => ({
                value: user.id,
                label: `${user.name} (${user.email})`,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label="Name"
              placeholder="Production API key"
              required
            />
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
      </FormShell>
    </form>
  );
}
