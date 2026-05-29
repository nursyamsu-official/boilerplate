"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { menuUpdateSchema } from "../schemas/menu-update.schema";
import { menuUpdateService } from "../services/menu-update.service";

async function requireSessionUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
}

export async function menuUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = menuUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid menu data");
  }

  return menuUpdateService(parsed.data);
}
