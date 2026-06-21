"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { menuUpdateSchema } from "../schemas/menu-update.schema";
import { menuUpdateService } from "../services/menu-update.service";

export async function menuUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof menuUpdateService>>>> {
  await requireSessionUserId();

  const parsed = menuUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid menu data" };
  }

  return runAction(() => menuUpdateService(parsed.data));
}
