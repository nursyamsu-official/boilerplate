"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { permissionCreateSchema } from "../schemas/permission-create.schema";
import { permissionCreateService } from "../services/permission-create.service";

export async function permissionCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof permissionCreateService>>>> {
  await requireSessionUserId();

  const parsed = permissionCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid permission data" };
  }

  return runAction(() => permissionCreateService(parsed.data));
}
