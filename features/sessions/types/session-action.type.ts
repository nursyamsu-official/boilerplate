export type SessionRevokeInput = {
  id: string;
  reason?: string;
};

export type SessionRevokeUserSessionsInput = {
  userId: string;
  reason?: string;
};
