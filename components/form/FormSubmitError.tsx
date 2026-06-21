"use client";

type FormSubmitErrorProps = {
  form: {
    Subscribe: (props: {
      selector: (state: { errorMap: { onSubmit?: unknown } }) => unknown;
      children: (formError: unknown) => React.ReactNode;
    }) => React.ReactNode;
  };
};

export function FormSubmitError({ form }: FormSubmitErrorProps) {
  return (
    <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
      {(formError) =>
        typeof formError === "string" && formError ? (
          <div
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {formError}
          </div>
        ) : null
      }
    </form.Subscribe>
  );
}
