"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import {
  menuDeleteSchema,
  menuGetByIdSchema,
  menuToggleStatusSchema,
} from "../schemas/menu-delete.schema";
import { menuDeleteService } from "../services/menu-delete.service";
import {
  menuGetByIdService,
  menuGetParentOptionsService,
} from "../services/menu-get-by-id.service";
import { menuToggleStatusService } from "../services/menu-update.service";
import type { MenuDetail, MenuParentOption } from "../types/menu.type";

async function requireSessionUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
}

export async function menuDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = menuDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid menu id");
  }

  return menuDeleteService(parsed.data.id);
}

export async function menuToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = menuToggleStatusSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid menu id");
  }

  return menuToggleStatusService(parsed.data.id);
}

export async function menuGetByIdAction(input: unknown): Promise<MenuDetail> {
  await requireSessionUserId();

  const parsed = menuGetByIdSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid menu id");
  }

  return menuGetByIdService(parsed.data.id);
}

export async function menuGetParentOptionsAction(
  excludeMenuId?: string,
): Promise<MenuParentOption[]> {
  await requireSessionUserId();
  return menuGetParentOptionsService(excludeMenuId);
}
