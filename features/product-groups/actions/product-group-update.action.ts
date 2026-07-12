"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  productGroupDeleteSchema,
  productGroupUpdateSchema,
} from "../schemas/product-group-create.schema";
import { productGroupUpdateService } from "../services/product-group-update.service";

export async function productGroupUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productGroupUpdateService>>>> {
  await requireSessionUserId();

  const parsed = productGroupUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product group data" };
  }

  return runAction(() => productGroupUpdateService(parsed.data));
}

export async function productGroupGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productGroupDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product group id");
  }

  const { productGroupGetByIdService } = await import(
    "../services/product-group-get-by-id.service"
  );

  return productGroupGetByIdService(parsed.data.id);
}
