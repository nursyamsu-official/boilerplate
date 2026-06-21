"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  apiKeyCreateSchema,
  apiKeyDeleteSchema,
  apiKeyRevokeSchema,
  apiKeyUpdateSchema,
} from "../schemas/api-key.schema";
import {
  apiKeyCreateService,
  apiKeyDeleteService,
  apiKeyGetByIdService,
  apiKeyRevokeService,
  apiKeyUpdateService,
} from "../services/api-key-mutation.service";

export async function apiKeyCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof apiKeyCreateService>>>> {
  const actorId = await requireSessionUserId();

  const parsed = apiKeyCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid API key data" };
  }

  return runAction(() => apiKeyCreateService(parsed.data, actorId));
}

export async function apiKeyUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof apiKeyUpdateService>>>> {
  const actorId = await requireSessionUserId();

  const parsed = apiKeyUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid API key data" };
  }

  return runAction(() => apiKeyUpdateService(parsed.data, actorId));
}

export async function apiKeyRevokeAction(input: unknown) {
  const actorId = await requireSessionUserId();

  const parsed = apiKeyRevokeSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid API key id");
  }

  return apiKeyRevokeService(parsed.data.id, actorId);
}

export async function apiKeyDeleteAction(input: unknown) {
  const actorId = await requireSessionUserId();

  const parsed = apiKeyDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid API key id");
  }

  return apiKeyDeleteService(parsed.data.id, actorId);
}

export async function apiKeyGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = apiKeyDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid API key id");
  }

  return apiKeyGetByIdService(parsed.data.id);
}
