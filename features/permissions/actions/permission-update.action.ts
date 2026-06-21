"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  permissionDeleteSchema,
  permissionUpdateSchema,
} from "../schemas/permission-create.schema";
import { permissionUpdateService } from "../services/permission-update.service";

export async function permissionUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof permissionUpdateService>>>> {
  await requireSessionUserId();

  const parsed = permissionUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid permission data" };
  }

  return runAction(() => permissionUpdateService(parsed.data));
}

export async function permissionGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid permission id");
  }

  const { permissionGetByIdService } = await import(
    "../services/permission-get-by-id.service"
  );

  return permissionGetByIdService(parsed.data.id);
}
