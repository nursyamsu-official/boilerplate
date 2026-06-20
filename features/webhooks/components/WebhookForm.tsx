"use client";

import { useForm } from "@tanstack/react-form";

import { NumberField } from "@/components/form/NumberField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { UserOption } from "@/features/users";
import { mapZodErrorToFormFieldErrors } from "@/lib/zod-form-validator";

import {
  webhookFormFieldsSchema,
  webhookUpdateFormFieldsSchema,
} from "../schemas/webhook-create.schema";
import type { WebhookFormValues } from "../types/webhook.type";

type WebhookFormProps = {
  defaultValues: WebhookFormValues;
  userOptions: UserOption[];
  isEdit?: boolean;
  hasSecret?: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: WebhookFormValues) => Promise<void>;
  onCancel: () => void;
};

export function WebhookForm({
  defaultValues,
  userOptions,
  isEdit = false,
  hasSecret = false,
  submitLabel,
  pendingLabel,
  onSubmit,
  onCancel,
}: WebhookFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmitAsync: async ({ value }) => {
        const schema = isEdit
          ? webhookUpdateFormFieldsSchema
          : webhookFormFieldsSchema;
        const parsed = schema.safeParse(value);

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
        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label="Name"
              placeholder="Order notifications"
              required
            />
          )}
        </form.Field>

        <form.Field name="url">
          {(field) => (
            <TextField
              field={field}
              label="URL"
              placeholder="https://example.com/webhooks"
              required
            />
          )}
        </form.Field>

        <form.Field name="events">
          {(field) => (
            <TextareaField
              field={field}
              label="Events"
              description="Comma-separated events or a JSON array of strings."
              placeholder="order.created, order.updated"
              required
            />
          )}
        </form.Field>

        <form.Field name="secret">
          {(field) => (
            <TextField
              field={field}
              label="Secret"
              type="password"
              description={
                isEdit && hasSecret
                  ? "Leave blank to keep the current secret."
                  : undefined
              }
              placeholder={isEdit && hasSecret ? "••••••••" : "Signing secret"}
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextareaField
              field={field}
              label="Description"
              placeholder="Optional description"
            />
          )}
        </form.Field>

        <form.Field name="headers">
          {(field) => (
            <TextareaField
              field={field}
              label="Headers"
              description="Optional JSON object for custom request headers."
              placeholder='{"Authorization":"Bearer token"}'
            />
          )}
        </form.Field>

        <form.Field name="userId">
          {(field) => (
            <SelectField
              field={field}
              label="Owner user"
              description="Optional user who owns this webhook."
              options={[
                { value: "", label: "No owner" },
                ...userOptions.map((user) => ({
                  value: user.id,
                  label: `${user.name} (${user.email})`,
                })),
              ]}
            />
          )}
        </form.Field>

        <form.Field name="maxRetries">
          {(field) => (
            <NumberField field={field} label="Max retries" placeholder="3" />
          )}
        </form.Field>

        <form.Field name="timeoutMs">
          {(field) => (
            <NumberField
              field={field}
              label="Timeout (ms)"
              placeholder="10000"
            />
          )}
        </form.Field>

        <form.Field name="isActive">
          {(field) => (
            <SwitchField
              field={field}
              label="Active"
              description="Inactive webhooks will not receive deliveries."
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
