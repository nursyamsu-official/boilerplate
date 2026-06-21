"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { EmailTemplateFormValues } from "../types/email-template.type";

type EmailTemplateFormProps = {
  defaultValues: EmailTemplateFormValues;
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<EmailTemplateFormValues, unknown>;
  onCancel: () => void;
};

export function EmailTemplateForm({
  defaultValues,
  isSystem = false,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: EmailTemplateFormProps) {
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
              description="Lowercase letters, numbers, and underscores only."
              placeholder="password_reset"
              disabled={isSystem}
              required
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label="Name"
              placeholder="Password Reset"
              required
            />
          )}
        </form.Field>

        <form.Field name="subject">
          {(field) => (
            <TextField
              field={field}
              label="Subject"
              placeholder="Reset your password"
              required
            />
          )}
        </form.Field>

        <form.Field name="bodyHtml">
          {(field) => (
            <TextareaField
              field={field}
              label="HTML body"
              description="Use placeholders like {{name}} for dynamic values."
              placeholder="<p>Hello {{name}}, ...</p>"
              rows={8}
              required
            />
          )}
        </form.Field>

        <form.Field name="bodyText">
          {(field) => (
            <TextareaField
              field={field}
              label="Plain text body"
              description="Optional fallback for non-HTML clients."
              placeholder="Hello {{name}}, ..."
              rows={4}
            />
          )}
        </form.Field>

        <form.Field name="variables">
          {(field) => (
            <TextField
              field={field}
              label="Variables"
              description="Optional JSON or comma-separated variable names."
              placeholder='["name","link"]'
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              field={field}
              label="Description"
              placeholder="Sent when a user requests a password reset."
            />
          )}
        </form.Field>

        <form.Field name="isActive">
          {(field) => (
            <SwitchField
              field={field}
              label="Active"
              description="Inactive templates cannot be used for delivery."
            />
          )}
        </form.Field>
      </FieldGroup>
      </FormShell>
    </form>
  );
}
