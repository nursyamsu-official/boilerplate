"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SelectField } from "@/components/form/SelectField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { SsoProviderOption } from "@/features/sso-providers";
import type { UserOption } from "@/features/users";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { SsoUserFormValues } from "../types/sso-user.type";

type SsoUserFormProps = {
  defaultValues: SsoUserFormValues;
  userOptions: UserOption[];
  providerOptions: SsoProviderOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<SsoUserFormValues, unknown>;
  onCancel: () => void;
};

export function SsoUserForm({
  defaultValues,
  userOptions,
  providerOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: SsoUserFormProps) {
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
              required
              options={userOptions.map((user) => ({
                value: user.id,
                label: `${user.name} (${user.email})`,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="providerId">
          {(field) => (
            <SelectField
              field={field}
              label="SSO provider"
              required
              options={providerOptions.map((provider) => ({
                value: provider.id,
                label: `${provider.name} (${provider.code})`,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="externalId">
          {(field) => (
            <TextField
              field={field}
              label="External ID"
              placeholder="Provider subject identifier"
              required
            />
          )}
        </form.Field>

        <form.Field name="emailAtProvider">
          {(field) => (
            <TextField
              field={field}
              label="Email at provider"
              type="email"
              placeholder="user@provider.com"
            />
          )}
        </form.Field>

        <form.Field name="displayName">
          {(field) => (
            <TextField
              field={field}
              label="Display name"
              placeholder="Name from provider profile"
            />
          )}
        </form.Field>

        <form.Field name="rawProfile">
          {(field) => (
            <TextareaField
              field={field}
              label="Raw profile"
              description="Optional JSON snapshot of the provider profile."
              placeholder='{"sub":"123","email":"user@provider.com"}'
            />
          )}
        </form.Field>
      </FieldGroup>
      </FormShell>
    </form>
  );
}
