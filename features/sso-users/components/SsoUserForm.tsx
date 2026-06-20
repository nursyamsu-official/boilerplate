"use client";

import { useForm } from "@tanstack/react-form";

import { SelectField } from "@/components/form/SelectField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { SsoProviderOption } from "@/features/sso-providers";
import type { UserOption } from "@/features/users";
import { mapZodErrorToFormFieldErrors } from "@/lib/zod-form-validator";

import { ssoUserFormFieldsSchema } from "../schemas/sso-user-create.schema";
import type { SsoUserFormValues } from "../types/sso-user.type";

type SsoUserFormProps = {
  defaultValues: SsoUserFormValues;
  userOptions: UserOption[];
  providerOptions: SsoProviderOption[];
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: SsoUserFormValues) => Promise<void>;
  onCancel: () => void;
};

export function SsoUserForm({
  defaultValues,
  userOptions,
  providerOptions,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: SsoUserFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync: async ({ value }) => {
        const parsed = ssoUserFormFieldsSchema.safeParse(value);

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
