import { ssoUserGetByIdRepository } from "../repositories/sso-user-create.repository";
import type { SsoUserDetail } from "../types/sso-user.type";

export async function ssoUserGetByIdService(id: string): Promise<SsoUserDetail> {
  const link = await ssoUserGetByIdRepository(id);
  if (!link) {
    throw new Error("SSO user link not found");
  }

  return link;
}
