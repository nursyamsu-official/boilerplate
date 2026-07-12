"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  countryDeleteSchema,
  countryUpdateSchema,
} from "../schemas/country-create.schema";
import { countryUpdateService } from "../services/country-update.service";

export async function countryUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof countryUpdateService>>>> {
  await requireSessionUserId();

  const parsed = countryUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid country data" };
  }

  return runAction(() => countryUpdateService(parsed.data));
}

export async function countryGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = countryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid country id");
  }

  const { countryGetByIdService } = await import(
    "../services/country-get-by-id.service"
  );

  return countryGetByIdService(parsed.data.id);
}
