import { prisma } from "@/lib/prisma";
import { hashEmailChangeToken } from "./email-change-token";

export type VerifyEmailChangeResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Token-only email change completion. No session is required.
 * Use from a Route Handler (POST) for logged-in users: deleting the session
 * in a Server Action can invalidate the action response mid-flight.
 */
export async function executeEmailChangeVerification(
  token: string,
): Promise<VerifyEmailChangeResult> {
  if (!token.trim()) {
    return { ok: false, message: "Missing verification token" };
  }

  const hashed = hashEmailChangeToken(token);

  const request = await prisma.emailChangeRequest.findUnique({
    where: { token: hashed },
    select: {
      id: true,
      userId: true,
      newEmail: true,
      expiresAt: true,
      usedAt: true,
    },
  });

  if (!request) {
    return { ok: false, message: "Invalid verification link" };
  }

  if (request.usedAt) {
    const user = await prisma.user.findUnique({
      where: { id: request.userId },
      select: { email: true },
    });
    if (
      user &&
      user.email.toLowerCase() === request.newEmail.toLowerCase()
    ) {
      return { ok: true };
    }
    return {
      ok: false,
      message: "This verification link has already been used",
    };
  }

  if (request.expiresAt < new Date()) {
    return { ok: false, message: "This verification link has expired" };
  }

  const emailTaken = await prisma.user.findUnique({
    where: { email: request.newEmail },
    select: { id: true },
  });

  if (emailTaken && emailTaken.id !== request.userId) {
    return {
      ok: false,
      message: "This email is already in use by another account",
    };
  }

  const userBefore = await prisma.user.findUnique({
    where: { id: request.userId },
    select: { email: true },
  });

  if (!userBefore) {
    return { ok: false, message: "User not found" };
  }

  const previousEmail = userBefore.email;
  if (previousEmail.toLowerCase() === request.newEmail.toLowerCase()) {
    return { ok: false, message: "Invalid email change request" };
  }

  try {
    await prisma.$transaction([
      prisma.session.deleteMany({
        where: {
          OR: [
            { userId: request.userId },
            { user: { email: previousEmail } },
          ],
        },
      }),
      prisma.user.update({
        where: { id: request.userId },
        data: { email: request.newEmail, emailVerified: true },
      }),
      prisma.emailChangeRequest.update({
        where: { id: request.id },
        data: { usedAt: new Date() },
      }),
    ]);
  } catch (e) {
    if (isPrismaUniqueViolation(e)) {
      return {
        ok: false,
        message: "This email is already in use by another account",
      };
    }
    return { ok: false, message: "Failed to update email" };
  }

  return { ok: true };
}

function isPrismaUniqueViolation(e: unknown): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    (e as { code: string }).code === "P2002"
  );
}
