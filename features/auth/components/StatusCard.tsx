import Link from "next/link"

import { Button } from "@/components/ui/button"

type StatusCardProps = {
  title: string
  description: string
  buttonText: string
  href: string
}

export function StatusCard({
  title,
  description,
  buttonText,
  href,
}: StatusCardProps) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button asChild className="w-full">
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  )
}
