import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type AuthTextFieldProps = {
  id: string
  label: string
  type?: string
  autoComplete?: string
  value: string
  invalid?: boolean
  errors?: string[]
  placeholder?: string
  onBlur: () => void
  onChange: (value: string) => void
}

export function AuthTextField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  invalid,
  errors,
  placeholder,
  onBlur,
  onChange,
}: AuthTextFieldProps) {
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={id}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
        <FieldError
          errors={errors?.map((message) => ({
            message,
          }))}
        />
      </FieldContent>
    </Field>
  )
}
