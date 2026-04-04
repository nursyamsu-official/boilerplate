"use client"

import { useCallback } from "react"

import { buildAbsoluteUrl } from "@/features/auth/lib/auth-routes"

export function useAuthRedirectUrl() {
  return useCallback((path: string) => buildAbsoluteUrl(path), [])
}
