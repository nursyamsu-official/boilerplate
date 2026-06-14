"use client";

import { useForm } from "@tanstack/react-form";

import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { emailTemplateFormFieldsSchema } from "../schemas/email-template-create.schema";
import type { EmailTemplateFormValues } from "../types/email-template.type";

type EmailTemplateFormProps = {
  defaultValues: EmailTemplateFormValues;
  isSystem?: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: EmailTemplateFormValues) => Promise<void>;
  onCancel: () => void;
};

export function EmailTemplateForm({
  defaultValues,
  isSystem = false,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: EmailTemplateFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = emailTemplateFormFieldsSchema.safeParse(value);
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
              placeholder="password_reset"
              disabled={isSystem}
            />
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField field={field} label="Name" placeholder="Password Reset" />
          )}
        </form.Field>

        <form.Field name="subject">
          {(field) => (
            <TextField
              field={field}
              label="Subject"
              placeholder="Reset your password"
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
