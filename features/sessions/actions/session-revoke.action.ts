"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  sessionRevokeSchema,
  sessionRevokeUserSessionsSchema,
} from "../schemas/session-filter.schema";
import { sessionRevokeService } from "../services/session-revoke.service";
import { sessionRevokeUserSessionsService } from "../services/session-revoke.service";

export async function sessionRevokeAction(input: unknown) {
  const actorId = await requireSessionUserId();

  const parsed = sessionRevokeSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid session id");
  }

  return sessionRevokeService(parsed.data, actorId);
}

export async function sessionRevokeUserSessionsAction(input: unknown) {
  const actorId = await requireSessionUserId();

  const parsed = sessionRevokeUserSessionsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid user id");
  }

  return sessionRevokeUserSessionsService(parsed.data, actorId);
}
