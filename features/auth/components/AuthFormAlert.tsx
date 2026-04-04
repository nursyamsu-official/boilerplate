import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AuthFormAlertProps = {
  title: string
  description: string
  variant?: "default" | "destructive"
}

export function AuthFormAlert({
  title,
  description,
  variant = "default",
}: AuthFormAlertProps) {
  return (
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
