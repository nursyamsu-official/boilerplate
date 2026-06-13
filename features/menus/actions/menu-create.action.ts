"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { menuCreateSchema } from "../schemas/menu-create.schema";
import { menuCreateService } from "../services/menu-create.service";

export async function menuCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = menuCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid menu data");
  }

  return menuCreateService(parsed.data);
}
