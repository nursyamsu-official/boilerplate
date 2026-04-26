"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { newEmailForChangeSchema, type NewEmailForChangeInput } from "../index";

export type AssertNewEmailForChangeResult =
  | { ok: true }
  | { ok: false; message: string };

export async function assertNewEmailAvailableForChange(
  input: NewEmailForChangeInput,
): Promise<AssertNewEmailForChangeResult> {
  const parsed = newEmailForChangeSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return {
      ok: false,
      message: first ?? "Invalid email",
    };
  }

  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) {
    return { ok: false, message: "Not authenticated" };
  }

  const newEmail = parsed.data.newEmail.trim().toLowerCase();
  const currentEmail = session.user.email.toLowerCase();
  if (newEmail === currentEmail) {
    return { ok: false, message: "Failed! Email is the same" };
  }

  const existing = await prisma.user.findUnique({
    where: { email: newEmail },
    select: { id: true },
  });

  if (existing && existing.id !== session.user.id) {
    return {
      ok: false,
      message: "Failed! This email is already in use",
    };
  }

  return { ok: true };
}
