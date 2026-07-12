"use client";

import { useForm } from "@tanstack/react-form";

import { FormSubmitError } from "@/components/form/FormSubmitError";
import { FormShell, getFormClassName } from "@/components/form/form-dialog-layout";
import { NumberField } from "@/components/form/NumberField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { EvaluationTemplateOption } from "@/features/evaluation-templates";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { EvaluationCriteriaFormValues } from "../types/evaluation-criteria.type";

type EvaluationCriteriaFormProps = {
  defaultValues: EvaluationCriteriaFormValues;
  templateOptions: EvaluationTemplateOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<EvaluationCriteriaFormValues, unknown>;
  onCancel: () => void;
};

export function EvaluationCriteriaForm({
  defaultValues,
  templateOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: EvaluationCriteriaFormProps) {
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
          <form.Field name="templateId">
            {(field) => (
              <SelectField
                field={field}
                label="Evaluation Template"
                placeholder="Select evaluation template"
                options={templateOptions.map((template) => ({
                  value: template.id,
                  label: template.name,
                }))}
                required
              />
            )}
          </form.Field>

          <form.Field name="code">
            {(field) => (
              <TextField
                field={field}
                label="Code"
                description="Lowercase letters, numbers, and underscores only."
                placeholder="technical_compliance"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Technical Compliance"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the evaluation criterion"
              />
            )}
          </form.Field>

          <form.Field name="weight">
            {(field) => (
              <NumberField
                field={field}
                label="Weight"
                description="Weight used for weighted scoring."
                min={0}
                required
              />
            )}
          </form.Field>

          <form.Field name="maxScore">
            {(field) => (
              <NumberField
                field={field}
                label="Max Score"
                description="Optional maximum achievable score."
                min={0}
              />
            )}
          </form.Field>

          <form.Field name="sortOrder">
            {(field) => (
              <NumberField
                field={field}
                label="Sort Order"
                description="Display and evaluation order."
                min={0}
                required
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive evaluation criteria are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
