import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [twoFactorClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  requestPasswordReset,
  resetPassword,
  changePassword,
  sendVerificationEmail,
  twoFactor,
  updateUser,
  changeEmail,
  deleteUser,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  listAccounts,
  unlinkAccount,
  linkSocial,
} = authClient;
