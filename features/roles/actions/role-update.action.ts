"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  roleDeleteSchema,
  roleUpdateSchema,
} from "../schemas/role-create.schema";
import { roleUpdateService } from "../services/role-update.service";

export async function roleUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof roleUpdateService>>>> {
  await requireSessionUserId();

  const parsed = roleUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid role data" };
  }

  return runAction(() => roleUpdateService(parsed.data));
}

export async function roleGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = roleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid role id");
  }

  const { roleGetByIdService } = await import(
    "../services/role-get-by-id.service"
  );

  return roleGetByIdService(parsed.data.id);
}
