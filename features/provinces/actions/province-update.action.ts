"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  provinceDeleteSchema,
  provinceUpdateSchema,
} from "../schemas/province-create.schema";
import { provinceUpdateService } from "../services/province-update.service";

export async function provinceUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof provinceUpdateService>>>> {
  await requireSessionUserId();

  const parsed = provinceUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid province data" };
  }

  return runAction(() => provinceUpdateService(parsed.data));
}

export async function provinceGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = provinceDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid province id");
  }

  const { provinceGetByIdService } = await import(
    "../services/province-get-by-id.service"
  );

  return provinceGetByIdService(parsed.data.id);
}
