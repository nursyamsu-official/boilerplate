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
import type { EvaluationMethodOption } from "@/features/evaluation-methods";
import type { EvaluationScoringMethodOption } from "@/features/evaluation-scoring-methods";
import {
  useFormActionSubmit,
  type FormActionSubmitConfig,
} from "@/lib/use-form-action-submit";

import type { EvaluationTemplateFormValues } from "../types/evaluation-template.type";

type EvaluationTemplateFormProps = {
  defaultValues: EvaluationTemplateFormValues;
  methodOptions: EvaluationMethodOption[];
  scoringMethodOptions: EvaluationScoringMethodOption[];
  submitLabel: string;
  pendingLabel: string;
  layout?: "default" | "dialog";
  submitConfig: FormActionSubmitConfig<EvaluationTemplateFormValues, unknown>;
  onCancel: () => void;
};

export function EvaluationTemplateForm({
  defaultValues,
  methodOptions,
  scoringMethodOptions,
  submitLabel,
  pendingLabel,
  layout = "default",
  submitConfig,
  onCancel,
}: EvaluationTemplateFormProps) {
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
                placeholder="evaluation_template_code"
                required
              />
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Name"
                placeholder="Evaluation template name"
                required
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                placeholder="Brief description of the evaluation template"
              />
            )}
          </form.Field>

          <form.Field name="evaluationMethodId">
            {(field) => (
              <SelectField
                field={field}
                label="Evaluation method"
                placeholder="Select evaluation method"
                required
                options={methodOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field name="evaluationScoringMethodId">
            {(field) => (
              <SelectField
                field={field}
                label="Evaluation scoring method"
                placeholder="Select evaluation scoring method"
                required
                options={scoringMethodOptions.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <SwitchField
                field={field}
                label="Active"
                description="Inactive evaluation templates are hidden from selection lists."
              />
            )}
          </form.Field>
        </FieldGroup>
      </FormShell>
    </form>
  );
}
