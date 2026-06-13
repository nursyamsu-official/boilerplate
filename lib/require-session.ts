import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function requireSessionUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
}
