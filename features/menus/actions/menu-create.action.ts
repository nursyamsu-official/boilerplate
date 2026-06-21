"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { menuCreateSchema } from "../schemas/menu-create.schema";
import { menuCreateService } from "../services/menu-create.service";

export async function menuCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof menuCreateService>>>> {
  await requireSessionUserId();

  const parsed = menuCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid menu data" };
  }

  return runAction(() => menuCreateService(parsed.data));
}
