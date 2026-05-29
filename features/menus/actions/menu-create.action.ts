"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { menuCreateSchema } from "../schemas/menu-create.schema";
import { menuCreateService } from "../services/menu-create.service";

async function requireSessionUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
}

export async function menuCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = menuCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid menu data");
  }

  return menuCreateService(parsed.data);
}
