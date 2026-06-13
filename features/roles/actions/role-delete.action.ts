"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { roleDeleteSchema } from "../schemas/role-create.schema";
import { roleDeleteService } from "../services/role-delete.service";
import { roleToggleStatusService } from "../services/role-update.service";

export async function roleDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = roleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid role id");
  }

  return roleDeleteService(parsed.data.id);
}

export async function roleToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = roleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid role id");
  }

  return roleToggleStatusService(parsed.data.id);
}
