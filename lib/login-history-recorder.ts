import { prisma } from "@/lib/prisma";
import type { LoginStatus } from "@/generated/prisma/client";

type RecordLoginHistoryInput = {
  userId?: string | null;
  email: string;
  status: LoginStatus;
  failureReason?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  sessionId?: string | null;
};

export async function recordLoginHistory(input: RecordLoginHistoryInput) {
  await prisma.loginHistory.create({
    data: {
      userId: input.userId ?? null,
      email: input.email,
      status: input.status,
      failureReason: input.failureReason ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
      sessionId: input.sessionId ?? null,
    },
  });

  if (input.status === "SUCCESS" && input.userId) {
    await prisma.user.update({
      where: { id: input.userId },
      data: {
        lastLoginAt: new Date(),
        lastLoginIp: input.ipAddress ?? null,
      },
    });
  }
}

export function getRequestIp(request: Request | undefined): string | null {
  if (!request) return null;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip");
}

export function getRequestUserAgent(request: Request | undefined): string | null {
  return request?.headers.get("user-agent") ?? null;
}
