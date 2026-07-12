"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { organizationalUnitCreateSchema } from "../schemas/organizational-unit-create.schema";
import { organizationalUnitCreateService } from "../services/organizational-unit-create.service";

export async function organizationalUnitCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof organizationalUnitCreateService>>>
> {
  await requireSessionUserId();

  const parsed = organizationalUnitCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid organizational unit data" };
  }

  return runAction(() => organizationalUnitCreateService(parsed.data));
}
