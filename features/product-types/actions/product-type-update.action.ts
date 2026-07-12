"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  productTypeDeleteSchema,
  productTypeUpdateSchema,
} from "../schemas/product-type-create.schema";
import { productTypeUpdateService } from "../services/product-type-update.service";

export async function productTypeUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productTypeUpdateService>>>> {
  await requireSessionUserId();

  const parsed = productTypeUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product type data" };
  }

  return runAction(() => productTypeUpdateService(parsed.data));
}

export async function productTypeGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productTypeDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product type id");
  }

  const { productTypeGetByIdService } = await import(
    "../services/product-type-get-by-id.service"
  );

  return productTypeGetByIdService(parsed.data.id);
}
