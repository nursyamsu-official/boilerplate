"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { RoleOption } from "@/features/roles";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import { ssoProtocolValues } from "../schemas/sso-provider-filter.schema";
import type { SsoProviderFormValues } from "../types/sso-provider.type";

type SsoProviderFormProps = {
  defaultValues: SsoProviderFormValues;
  roleOptions: RoleOption[];
  isEdit?: boolean;
  hasClientSecret?: boolean;
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<SsoProviderFormValues, unknown>;
  onCancel: () => void;
};

export function SsoProviderForm({
  defaultValues,
  roleOptions,
  isEdit = false,
  hasClientSecret = false,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: SsoProviderFormProps) {
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
              placeholder="google"
              description="Unique identifier used in configuration."
              required
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label="Name"
              placeholder="Google SSO"
              required
            />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.protocol}>
          {(protocol) => (
            <>
              <form.Field name="protocol">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Protocol"
                    required
                    options={ssoProtocolValues.map((value) => ({
                      value,
                      label: value,
                    }))}
                  />
                )}
              </form.Field>

              {protocol === "OIDC" || protocol === "SAML" ? (
                <form.Field name="issuerUrl">
                  {(field) => (
                    <TextField
                      field={field}
                      label="Issuer URL"
                      placeholder="https://issuer.example.com"
                      required
                    />
                  )}
                </form.Field>
              ) : null}

              {protocol === "OAUTH2" || protocol === "OIDC" ? (
                <>
                  <form.Field name="authUrl">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Auth URL"
                        placeholder="https://auth.example.com/authorize"
                        required={protocol === "OAUTH2"}
                      />
                    )}
                  </form.Field>

                  <form.Field name="tokenUrl">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Token URL"
                        placeholder="https://auth.example.com/token"
                        required={protocol === "OAUTH2"}
                      />
                    )}
                  </form.Field>

                  {protocol === "OIDC" ? (
                    <form.Field name="userinfoUrl">
                      {(field) => (
                        <TextField
                          field={field}
                          label="Userinfo URL"
                          placeholder="https://auth.example.com/userinfo"
                        />
                      )}
                    </form.Field>
                  ) : null}

                  <form.Field name="clientId">
                    {(field) => (
                      <TextField field={field} label="Client ID" required />
                    )}
                  </form.Field>

                  <form.Field name="clientSecret">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Client secret"
                        type="password"
                        description={
                          isEdit && hasClientSecret
                            ? "Leave blank to keep the current secret."
                            : undefined
                        }
                        placeholder={
                          isEdit && hasClientSecret ? "••••••••" : "Client secret"
                        }
                      />
                    )}
                  </form.Field>
                </>
              ) : null}

              {protocol === "SAML" ? (
                <form.Field name="metadata">
                  {(field) => (
                    <TextareaField
                      field={field}
                      label="Metadata"
                      description="SAML metadata XML or JSON configuration."
                    />
                  )}
                </form.Field>
              ) : null}
            </>
          )}
        </form.Subscribe>

        <form.Field name="callbackUrl">
          {(field) => (
            <TextField
              field={field}
              label="Callback URL"
              placeholder="https://app.example.com/auth/callback"
            />
          )}
        </form.Field>

        <form.Field name="scopes">
          {(field) => (
            <TextField
              field={field}
              label="Scopes"
              placeholder="openid profile email"
            />
          )}
        </form.Field>

        <form.Field name="defaultRoleId">
          {(field) => (
            <SelectField
              field={field}
              label="Default role"
              description="Assigned to auto-provisioned users."
              allowEmpty
              emptyLabel="No default role"
              options={roleOptions.map((role) => ({
                value: role.id,
                label: role.name,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="autoProvision">
          {(field) => (
            <SwitchField
              field={field}
              label="Auto provision"
              description="Create local users automatically on first SSO login."
            />
          )}
        </form.Field>

        <form.Field name="isActive">
          {(field) => (
            <SwitchField
              field={field}
              label="Active"
              description="Inactive providers cannot be used for sign-in."
            />
          )}
        </form.Field>
      </FieldGroup>
      </FormShell>
    </form>
  );
}
