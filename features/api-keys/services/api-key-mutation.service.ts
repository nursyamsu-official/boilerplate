import { headers } from "next/headers";

import { recordAuditLog } from "@/lib/audit-log-recorder";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/login-history-recorder";

import { generateApiKey } from "../lib/api-key-generator";
import {
  apiKeyCreateRepository,
  apiKeyDeleteRepository,
  apiKeyGetByIdRepository,
  apiKeyRevokeRepository,
  apiKeyUpdateRepository,
} from "../repositories/api-key.repository";
import type { ApiKeyCreateInput, ApiKeyUpdateInput } from "../types/api-key-input.type";

async function getAuditContext(actorId: string) {
  const requestHeaders = await headers();

  return {
    actorId,
    ipAddress: getRequestIp({ headers: requestHeaders } as Request),
    userAgent: getRequestUserAgent({ headers: requestHeaders } as Request),
  };
}

function parseOptionalDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid expiration date");
  }
  return date;
}

function normalizeOptionalText(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function apiKeyCreateService(
  input: ApiKeyCreateInput,
  actorId: string,
) {
  const { rawKey, hashedKey, prefix } = generateApiKey(input.name);

  const apiKey = await apiKeyCreateRepository({
    userId: input.userId,
    name: input.name.trim(),
    description: normalizeOptionalText(input.description),
    prefix,
    hashedKey,
    scopes: normalizeOptionalText(input.scopes),
    expiresAt: parseOptionalDate(input.expiresAt),
  });

  const auditContext = await getAuditContext(actorId);

  await recordAuditLog({
    ...auditContext,
    action: "CREATE",
    entity: "apiKey",
    entityId: apiKey.id,
    summary: `API key created: ${apiKey.name}`,
    newValues: {
      id: apiKey.id,
      userId: apiKey.userId,
      name: apiKey.name,
      prefix: apiKey.prefix,
    },
  });

  return { apiKey, rawKey };
}

export async function apiKeyUpdateService(
  input: ApiKeyUpdateInput,
  actorId: string,
) {
  const existing = await apiKeyGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("API key not found");
  }

  if (existing.revokedAt) {
    throw new Error("Revoked API keys cannot be updated");
  }

  const apiKey = await apiKeyUpdateRepository({
    id: input.id,
    userId: input.userId,
    name: input.name.trim(),
    description: normalizeOptionalText(input.description),
    scopes: normalizeOptionalText(input.scopes),
    expiresAt: parseOptionalDate(input.expiresAt),
    isActive: input.isActive,
  });

  const auditContext = await getAuditContext(actorId);

  await recordAuditLog({
    ...auditContext,
    action: "UPDATE",
    entity: "apiKey",
    entityId: apiKey.id,
    summary: `API key updated: ${apiKey.name}`,
    oldValues: {
      userId: existing.userId,
      name: existing.name,
      isActive: existing.isActive,
    },
    newValues: {
      userId: apiKey.userId,
      name: apiKey.name,
      isActive: apiKey.isActive,
    },
  });

  return apiKey;
}

export async function apiKeyRevokeService(id: string, actorId: string) {
  const existing = await apiKeyGetByIdRepository(id);
  if (!existing) {
    throw new Error("API key not found");
  }

  if (existing.revokedAt) {
    throw new Error("API key is already revoked");
  }

  const apiKey = await apiKeyRevokeRepository(id, actorId);
  const auditContext = await getAuditContext(actorId);

  await recordAuditLog({
    ...auditContext,
    action: "REVOKE",
    entity: "apiKey",
    entityId: apiKey.id,
    summary: `API key revoked: ${existing.name}`,
    oldValues: { isActive: existing.isActive },
    newValues: { isActive: false, revokedAt: apiKey.revokedAt },
  });

  return apiKey;
}

export async function apiKeyDeleteService(id: string, actorId: string) {
  const existing = await apiKeyGetByIdRepository(id);
  if (!existing) {
    throw new Error("API key not found");
  }

  if (existing.isActive && !existing.revokedAt) {
    throw new Error("Revoke the API key before deleting it");
  }

  const deleted = await apiKeyDeleteRepository(id);
  const auditContext = await getAuditContext(actorId);

  await recordAuditLog({
    ...auditContext,
    action: "DELETE",
    entity: "apiKey",
    entityId: deleted.id,
    summary: `API key deleted: ${deleted.name}`,
    oldValues: {
      id: deleted.id,
      name: deleted.name,
      prefix: deleted.prefix,
      userId: deleted.userId,
    },
  });

  return deleted;
}

export async function apiKeyGetByIdService(id: string) {
  const apiKey = await apiKeyGetByIdRepository(id);
  if (!apiKey) {
    throw new Error("API key not found");
  }

  return apiKey;
}
