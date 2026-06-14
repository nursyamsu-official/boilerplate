import { ssoUserDeleteRepository } from "../repositories/sso-user-delete.repository";
import { ssoUserGetByIdRepository } from "../repositories/sso-user-create.repository";

export async function ssoUserDeleteService(id: string) {
  const existing = await ssoUserGetByIdRepository(id);
  if (!existing) {
    throw new Error("SSO user link not found");
  }

  return ssoUserDeleteRepository(id);
}
