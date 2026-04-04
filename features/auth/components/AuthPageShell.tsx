import type { ReactNode } from "react"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { appConfig } from "@/config/app.config"

type AuthPageShellProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthPageShell({
  title,
  description,
  children,
  footer,
}: AuthPageShellProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <Link href="/" className="text-xs/relaxed font-medium text-muted-foreground">
          {appConfig.appName}
        </Link>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {footer ? <CardFooter className="border-t">{footer}</CardFooter> : null}
    </Card>
  )
}
