import { headers } from "next/headers";

import { recordAuditLog } from "@/lib/audit-log-recorder";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/login-history-recorder";

import {
  sessionDeleteByUserIdRepository,
  sessionDeleteRepository,
  sessionGetByIdRepository,
} from "../repositories/session-list.repository";
import type {
  SessionRevokeInput,
  SessionRevokeUserSessionsInput,
} from "../types/session-action.type";

async function getAuditContext(actorId: string) {
  const requestHeaders = await headers();

  return {
    actorId,
    ipAddress: getRequestIp({ headers: requestHeaders } as Request),
    userAgent: getRequestUserAgent({ headers: requestHeaders } as Request),
  };
}

export async function sessionRevokeService(
  input: SessionRevokeInput,
  actorId: string,
) {
  const existing = await sessionGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Session not found");
  }

  const auditContext = await getAuditContext(actorId);

  await recordAuditLog({
    ...auditContext,
    action: "REVOKE",
    entity: "session",
    entityId: existing.id,
    summary: input.reason
      ? `Session revoked: ${input.reason}`
      : "Session revoked by admin",
    oldValues: {
      userId: existing.userId,
      ipAddress: existing.ipAddress,
      userAgent: existing.userAgent,
      expiresAt: existing.expiresAt,
    },
  });

  await sessionDeleteRepository(input.id);

  return { id: input.id };
}

export async function sessionRevokeUserSessionsService(
  input: SessionRevokeUserSessionsInput,
  actorId: string,
) {
  const auditContext = await getAuditContext(actorId);

  const result = await sessionDeleteByUserIdRepository(input.userId);

  await recordAuditLog({
    ...auditContext,
    action: "REVOKE",
    entity: "session",
    entityId: input.userId,
    summary: input.reason
      ? `All sessions revoked for user: ${input.reason}`
      : "All sessions revoked for user by admin",
    newValues: { revokedCount: result.count },
  });

  return { count: result.count };
}
