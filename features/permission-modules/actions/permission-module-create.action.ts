"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { permissionModuleCreateSchema } from "../schemas/permission-module-create.schema";
import { permissionModuleCreateService } from "../services/permission-module-create.service";

export async function permissionModuleCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof permissionModuleCreateService>>>
> {
  await requireSessionUserId();

  const parsed = permissionModuleCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid module data" };
  }

  return runAction(() => permissionModuleCreateService(parsed.data));
}
