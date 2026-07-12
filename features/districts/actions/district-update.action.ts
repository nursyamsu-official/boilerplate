"use server";

import { z } from "zod";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  districtDeleteSchema,
  districtUpdateSchema,
} from "../schemas/district-create.schema";
import { districtUpdateService } from "../services/district-update.service";

export async function districtUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof districtUpdateService>>>> {
  await requireSessionUserId();

  const parsed = districtUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid district data" };
  }

  return runAction(() => districtUpdateService(parsed.data));
}

export async function districtGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = districtDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid district id");
  }

  const { districtGetByIdService } = await import(
    "../services/district-get-by-id.service"
  );

  return districtGetByIdService(parsed.data.id);
}

export async function districtGetProvinceOptionsAction(input: unknown) {
  await requireSessionUserId();

  const parsed = z
    .object({
      countryId: z.string().uuid("Invalid country id"),
    })
    .safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid country id");
  }

  const { provinceOptionsService } = await import(
    "@/features/provinces/services/province-options.service"
  );

  return provinceOptionsService(parsed.data.countryId);
}
