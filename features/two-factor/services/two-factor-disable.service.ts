import { headers } from "next/headers";

import { recordAuditLog } from "@/lib/audit-log-recorder";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/login-history-recorder";

import {
  twoFactorDisableRepository,
  twoFactorGetByUserIdRepository,
} from "../repositories/two-factor-list.repository";

export async function twoFactorDisableService(userId: string, actorId: string) {
  const existing = await twoFactorGetByUserIdRepository(userId);
  if (!existing) {
    throw new Error("Two-factor record not found");
  }

  const requestHeaders = await headers();

  await recordAuditLog({
    actorId,
    action: "REVOKE",
    entity: "twoFactor",
    entityId: existing.id,
    summary: `Two-factor authentication disabled for ${existing.user.email}`,
    oldValues: {
      userId: existing.userId,
      verified: existing.verified,
      twoFactorEnabled: existing.user.twoFactorEnabled,
    },
    ipAddress: getRequestIp({ headers: requestHeaders } as Request),
    userAgent: getRequestUserAgent({ headers: requestHeaders } as Request),
  });

  return twoFactorDisableRepository(userId);
}
