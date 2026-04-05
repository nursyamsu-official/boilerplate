"use client"

import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

type GoogleSignInButtonProps = {
  isPending?: boolean
  disabled?: boolean
  onClick: () => void | Promise<void>
}

export function GoogleSignInButton({
  isPending,
  disabled,
  onClick,
}: GoogleSignInButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => void onClick()}
      disabled={disabled || isPending}
    >
      {isPending ? <LoaderCircle className="animate-spin" /> : null}
      Continue with Google
    </Button>
  )
}
