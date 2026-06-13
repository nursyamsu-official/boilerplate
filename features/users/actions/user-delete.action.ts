"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  userDeleteSchema,
  userSetStatusSchema,
} from "../schemas/user-create.schema";
import { userDeleteService } from "../services/user-delete.service";
import { userSetStatusService } from "../services/user-set-status.service";

export async function userDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = userDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid user id");
  }

  return userDeleteService(parsed.data.id);
}

export async function userSetStatusAction(input: unknown) {
  const adminId = await requireSessionUserId();

  const parsed = userSetStatusSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid status data");
  }

  return userSetStatusService(parsed.data, adminId);
}
