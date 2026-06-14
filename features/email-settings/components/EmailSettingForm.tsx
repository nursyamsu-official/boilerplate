"use client";

import { useForm } from "@tanstack/react-form";

import { NumberField } from "@/components/form/NumberField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import {
  emailSettingFormFieldsSchema,
  emailSettingUpdateFormFieldsSchema,
} from "../schemas/email-setting-create.schema";
import { emailProviderValues } from "../schemas/email-setting-filter.schema";
import type { EmailSettingFormValues } from "../types/email-setting.type";

const apiProviders = new Set([
  "SENDGRID",
  "MAILGUN",
  "SES",
  "RESEND",
  "POSTMARK",
]);

type EmailSettingFormProps = {
  defaultValues: EmailSettingFormValues;
  isEdit?: boolean;
  hasPassword?: boolean;
  hasApiKey?: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: EmailSettingFormValues) => Promise<void>;
  onCancel: () => void;
};

export function EmailSettingForm({
  defaultValues,
  isEdit = false,
  hasPassword = false,
  hasApiKey = false,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: EmailSettingFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const schema = isEdit
        ? emailSettingUpdateFormFieldsSchema
        : emailSettingFormFieldsSchema;
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid form data");
      }

      await onSubmit(parsed.data as EmailSettingFormValues);
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
            <TextField field={field} label="Name" placeholder="Production SMTP" />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.provider}>
          {(provider) => (
            <>
              <form.Field name="provider">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Provider"
                    options={emailProviderValues.map((value) => ({
                      value,
                      label: value,
                    }))}
                  />
                )}
              </form.Field>

              {provider === "SMTP" ? (
                <>
                  <form.Field name="host">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Host"
                        placeholder="smtp.example.com"
                      />
                    )}
                  </form.Field>

                  <form.Field name="port">
                    {(field) => (
                      <NumberField field={field} label="Port" placeholder="587" />
                    )}
                  </form.Field>

                  <form.Field name="username">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Username"
                        placeholder="smtp-user"
                      />
                    )}
                  </form.Field>

                  <form.Field name="password">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Password"
                        type="password"
                        description={
                          isEdit && hasPassword
                            ? "Leave blank to keep the current password."
                            : undefined
                        }
                        placeholder={
                          isEdit && hasPassword ? "••••••••" : "Password"
                        }
                      />
                    )}
                  </form.Field>

                  <form.Field name="useTls">
                    {(field) => (
                      <SwitchField field={field} label="Use TLS" />
                    )}
                  </form.Field>
                </>
              ) : null}

              {apiProviders.has(provider) ? (
                <form.Field name="apiKey">
                  {(field) => (
                    <TextField
                      field={field}
                      label="API key"
                      type="password"
                      description={
                        isEdit && hasApiKey
                          ? "Leave blank to keep the current API key."
                          : undefined
                      }
                      placeholder={isEdit && hasApiKey ? "••••••••" : "API key"}
                    />
                  )}
                </form.Field>
              ) : null}
            </>
          )}
        </form.Subscribe>

        <form.Field name="fromEmail">
          {(field) => (
            <TextField
              field={field}
              label="From email"
              type="email"
              placeholder="noreply@example.com"
            />
          )}
        </form.Field>

        <form.Field name="fromName">
          {(field) => (
            <TextField
              field={field}
              label="From name"
              placeholder="Albayyinah"
            />
          )}
        </form.Field>

        <form.Field name="replyTo">
          {(field) => (
            <TextField
              field={field}
              label="Reply-to"
              type="email"
              placeholder="support@example.com"
            />
          )}
        </form.Field>

        <form.Field name="isActive">
          {(field) => (
            <SwitchField
              field={field}
              label="Active"
              description="Inactive settings cannot be used for delivery."
            />
          )}
        </form.Field>

        <form.Field name="isDefault">
          {(field) => (
            <SwitchField
              field={field}
              label="Default"
              description="Only one setting can be the default provider."
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
