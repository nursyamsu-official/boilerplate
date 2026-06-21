"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { roleDeleteSchema } from "../schemas/role-create.schema";
import { roleDeleteService } from "../services/role-delete.service";
import { roleToggleStatusService } from "../services/role-update.service";

export async function roleDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof roleDeleteService>>>> {
  await requireSessionUserId();

  const parsed = roleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid role id" };
  }

  return runAction(() => roleDeleteService(parsed.data.id));
}

export async function roleToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = roleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid role id");
  }

  return roleToggleStatusService(parsed.data.id);
}
