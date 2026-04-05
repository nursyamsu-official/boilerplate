"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/sonner"
import { authClient } from "@/lib/auth-client"

type VerifyEmailCardProps = {
  token?: string
}

export function VerifyEmailCard({ token }: VerifyEmailCardProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleVerify = async () => {
    if (!token) {
      toast.error("Failed to verify email")
      return
    }

    await toast.promise(
      (async () => {
        const result = await authClient.verifyEmail({
          query: {
            token,
          },
        })

        if (result.error) {
          throw new Error("Failed to verify email")
        }

        router.push("/dashboard")
        router.refresh()
      })(),
      {
        loading: "Verifying email...",
        success: "Updated successfully",
        error: "Failed to save",
      }
    )
  }

  const handleResend = async () => {
    if (!email) {
      toast.warning("Email is required")
      return
    }

    await toast.promise(
      (async () => {
        const result = await authClient.sendVerificationEmail({
          email,
          callbackURL: `${window.location.origin}/verify-email`,
        })

        if (result.error) {
          throw new Error("Failed to send verification email")
        }
      })(),
      {
        loading: "Sending verification...",
        success: "Saved successfully",
        error: "Failed to save",
      }
    )
  }

  return (
    <div className="space-y-4">
      {token ? (
        <>
          <p className="text-sm text-muted-foreground">
            Your verification token is ready. Click the button below to complete
            verification.
          </p>
          <Button className="w-full" onClick={() => void handleVerify()}>
            Verify email
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Enter your registered email to resend the verification link.
          </p>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button className="w-full" onClick={() => void handleResend()}>
            Resend verification email
          </Button>
        </>
      )}

      <div className="flex justify-end">
        <Link className="text-xs text-muted-foreground hover:underline" href="/sign-in">
          Back to login
        </Link>
      </div>
    </div>
  )
}
