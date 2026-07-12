"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  uomGlobalConversionDeleteSchema,
  uomGlobalConversionUpdateSchema,
} from "../schemas/uom-global-conversion-create.schema";
import { uomGlobalConversionUpdateService } from "../services/uom-global-conversion-update.service";

export async function uomGlobalConversionUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof uomGlobalConversionUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = uomGlobalConversionUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid conversion data" };
  }

  return runAction(() => uomGlobalConversionUpdateService(parsed.data));
}

export async function uomGlobalConversionGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = uomGlobalConversionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid conversion id");
  }

  const { uomGlobalConversionGetByIdService } = await import(
    "../services/uom-global-conversion-get-by-id.service"
  );

  return uomGlobalConversionGetByIdService(parsed.data.id);
}
