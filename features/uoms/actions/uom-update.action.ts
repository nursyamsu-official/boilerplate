"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  uomDeleteSchema,
  uomUpdateSchema,
} from "../schemas/uom-create.schema";
import { uomUpdateService } from "../services/uom-update.service";

export async function uomUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof uomUpdateService>>>> {
  await requireSessionUserId();

  const parsed = uomUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid UOM data" };
  }

  return runAction(() => uomUpdateService(parsed.data));
}

export async function uomGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = uomDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid UOM id");
  }

  const { uomGetByIdService } = await import(
    "../services/uom-get-by-id.service"
  );

  return uomGetByIdService(parsed.data.id);
}
