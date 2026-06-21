"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { permissionDeleteSchema } from "../schemas/permission-create.schema";
import { permissionDeleteService } from "../services/permission-delete.service";

export async function permissionDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof permissionDeleteService>>>> {
  await requireSessionUserId();

  const parsed = permissionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid permission id" };
  }

  return runAction(() => permissionDeleteService(parsed.data.id));
}
