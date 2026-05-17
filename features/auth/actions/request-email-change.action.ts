"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { securityConfig } from "@/config/security.config";
import { formatDurationCombined } from "@/lib/utils";

import { requestEmailChangeSchema } from "../schemas/request-email-change.schema";
import { generateEmailChangeToken } from "../lib/email-change-token";

import type { RequestEmailChangeInput } from "../schemas/request-email-change.schema";

export type RequestEmailChangeResult =
  | { ok: true }
  | { ok: false; message: string };

export async function requestEmailChange(
  input: RequestEmailChangeInput,
): Promise<RequestEmailChangeResult> {
  const parsed = requestEmailChangeSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid email" };
  }

  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) {
    return { ok: false, message: "Not authenticated" };
  }

  const newEmail = parsed.data.newEmail.trim().toLowerCase();
  const currentEmail = session.user.email.toLowerCase();

  if (newEmail === currentEmail) {
    return { ok: false, message: "New email is the same as current email" };
  }

  const existing = await prisma.user.findUnique({
    where: { email: newEmail },
    select: { id: true },
  });

  if (existing && existing.id !== session.user.id) {
    return { ok: false, message: "This email is already in use" };
  }

  const { raw, hashed } = generateEmailChangeToken();
  const expiresInSec = securityConfig.duration.emailChangeTokenExpiresInSec;
  const expiresAt = new Date(Date.now() + expiresInSec * 1000);

  await prisma.emailChangeRequest.create({
    data: {
      userId: session.user.id,
      newEmail,
      token: hashed,
      expiresAt,
    },
  });

  const verifyUrl = `${process.env.BETTER_AUTH_URL}/auth/change-email/verify?token=${raw}`;
  const expiryLabel = formatDurationCombined(expiresInSec);

  await sendEmail({
    to: newEmail,
    subject: "Verify your new email address",
    html: `
      <h2>Email Change Verification</h2>
      <p>Hi ${session.user.name},</p>
      <p>You requested to change your email address to <strong>${newEmail}</strong>.</p>
      <p>Click the link below to verify this new email:</p>
      <p><a href="${verifyUrl}">Verify New Email</a></p>
      <p>This link will expire in ${expiryLabel}.</p>
      <p>If you didn't request this change, you can safely ignore this email.</p>
    `,
  });

  return { ok: true };
}
